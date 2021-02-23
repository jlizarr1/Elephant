import numpy as np

from string import punctuation as punct

from gensim import corpora
from gensim.models import WordEmbeddingSimilarityIndex
from gensim.similarities import Similarity, SparseTermSimilarityMatrix, SoftCosineSimilarity

from .models import Item


# ignore all outputs to stderr from numpy
np.seterr(all="ignore")

class ItemSimilarity():
    """
        Class to handle calculating the similarity of item listings based on
        their name and description using soft cosine similarity.
    """

    uselessWords = ['there', 'the',' where', 'lost', 'missing', 'found',
        'location', 'mine', 'time', 'this']

    class ItemScore():
        """
            Is a wrapper class for item listings passed into the class, as well
            as having additional properties to help compute necessary
            information.
        """

        def __init__(self, item):
            self.item = item
            self.sentence = None
            self.score = 0

        def __lt__(self, other):
            return self.score < other.score

        def __le__(self, other):
            return self.score <= other.score

        def __str__(self):
            return self.item.name.lower() + ": " + self.item.desc.lower()

    def __init__(self, model):
        """
            Creates the class.

            Args:
                modelName: name of the model to download through gensim
        """

        # public properties
        self.itemScores = []
        self.dictionary = corpora.Dictionary()
        self.model = model
        self.wordEmbedding = WordEmbeddingSimilarityIndex(self.model)

    def isUsefulWord(self, word):
        if len(word) > 2:
            return True
        elif word not in self.uselessWords:
            return True

        return False

    def preprocess(self, preStr):
        processed = "".join(l if l not in punct else " " for l in preStr)
        tokenized = [token for token in processed.split() if self.isUsefulWord(token)]

        return tokenized

    def addItem(self, item):
        """
            Add `item` to use for computing its similarity to queried items.

            Args:
                item: item to add to 'self'
        """

        # create new ItemScore and dictionary entries from ItemScore
        newEntry = self.ItemScore(item)
        newDictEntry = corpora.Dictionary([self.preprocess(str(newEntry))])

        # add new entries to items and dictionary, update flags
        self.itemScores.append(newEntry)
        self.dictionary.merge_with(newDictEntry)

    def addItems(self, items):
        """
            Add every item in `items` to use for computing its similarity
            to queried items.

            Args:
                items: items to add to 'self'
        """

        # create new ItemScores and dictionary entries from ItemScore
        newEntries = [self.ItemScore(item) for item in items]
        newDictEntries = corpora.Dictionary(
            [self.preprocess(str(newScore)) for newScore in newEntries])

        # add new entries to items and dictionary, update flags
        self.itemScores = self.itemScores + newEntries
        self.dictionary.merge_with(newDictEntries)


    def clearItems(self):
        """
            Get rid of item scores in the class
        """

        self.itemScores = []


    def clearDictionary(self):
        """
            Git rid of dictionary entries from previous item listings
        """

        self.dictionary = corpora.Dictionary()
        self._bagOfWordsCalled = False


    def computeDictionary(self):
        """
            Compute the dictionary from all the item listings in the class.
        """

        self.dictionary = corpora.Dictionary(
            [self.preprocess(str(item)) for item in self.itemScores])


    def computeBagOfWordsForItems(self, corpus):
        """
            Compute the sentences (or the bag of words) for every item listing
            in self.

            Args:
                corpus: dictionary to use to create bag of words for each item
        """

        for itemScore in self.itemScores:
            itemScore.sentence = corpus.doc2bow(
                self.preprocess(str(itemScore)))


    def computeDocumentSimilarityIndex(self, corpus):
        """
            Compute the similarity matrix of the model

            Args:
                corpus: dictionary to use to create index

            Returns:
                SoftCosineSimilarity instance
        """

        if self.wordEmbedding is None:
            self.wordEmbedding = WordEmbeddingSimilarityIndex(self.model)

        # create similarity matrix, update flags
        simMatrix = SparseTermSimilarityMatrix(self.wordEmbedding, corpus)
        return SoftCosineSimilarity([x.sentence for x in self.itemScores], simMatrix)

    def scoreItems(self, itemToCompare):
        """
            Score every item listing in self. The score is how similar that item
            is to `itemToCompare`.

            Args:
                itemToCompare: item to see how similar it is to other items
        """

        # make itemToCompare's bag of words

        sentence = self.preprocess(str(self.ItemScore(itemToCompare)))

        newDict = corpora.Dictionary([sentence])
        newDict.merge_with(self.dictionary)

        sentence = newDict.doc2bow(sentence)

        self.computeBagOfWordsForItems(newDict)
        docsimIndex = self.computeDocumentSimilarityIndex(newDict)

        # score every item
        scores = docsimIndex[sentence].tolist()

        if scores == 0:
            return

        for score, itemScore in zip(scores, self.itemScores):
            itemScore.score = score

    def getSortedItems(self, getScores=False):
        """
            Get the items in self by how well they scored.

            Returns:
                list of items sorted by similarity to last compared item
        """

        results = [itemScore for itemScore in self.itemScores]
        results.sort(reverse=True)

        if getScores:
            return [(itemScore.item, itemScore.score) for itemScore in results]
        else:
            return [itemScore.item for itemScore in results]
