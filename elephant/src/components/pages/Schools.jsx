import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#0e5616"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.5),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.8),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom: '5%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(2em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '28px',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));


function Schools(){
    const classes = useStyles();
    return (
      <React.Fragment>
        <h1>View Universities</h1><br/>
        <h2>List of schools will go here</h2>
        <a href="/schoolProfile"><h4>School Profile</h4></a>
        <div className="App">
              <AppBar className={classes.appBar} position="static">
                  <Toolbar>
                      <Typography variant="h6" color="primary" >
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Box className={classes.hero}>
                  <Box>Schools</Box>

              </Box>
              <Container maxWidth="lg" className={classes.blogsContainer}>
                  <Typography variant="h4" className={classes.blogTitle}>
                      Find Your Best Fit College
                  </Typography>
                  <div className={classes.search}>
                      <div className={classes.searchIcon}>
                          <SearchIcon />
                      </div>
                      <InputBase
                          placeholder="Search…"
                          classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                          }}
                          inputProps={{ 'aria-label': 'search' }}
                      />
                  </div>
                  <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                              <CardActionArea a href="/">
                                  <CardMedia
                                      className={classes.media}
                                      image="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iWdYt2vIBYlQ/v1/1000x-1.jpg"
                                      title="Contemplative Reptile"
                                  />

                                  <Card>

                                  </Card>
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Johns Hopkins University
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Brief description
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions className={classes.cardActions}>
                                  <Box className={classes.author}>
                                      <Box ml={2}>
                                          <Typography variant="subtitle2" component="p">
                                          </Typography>
                                          <Typography variant="subtitle2" color="textSecondary" component="p">
                                              Date 1
                                          </Typography>
                                      </Box>
                                  </Box>
                                  <Box>
                                      <BookmarkBorderIcon />
                                  </Box>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                              <CardActionArea href="/">
                                  <CardMedia
                                      className={classes.media}
                                      image="https://www.commonapp.org/static/20f424969b58e494e871e8f724c19374/columbia-university_445.png"
                                      title="Contemplative Reptile"
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          Columbia University
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Brief description

                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions className={classes.cardActions}>
                                  <Box className={classes.author}>
                                      <Box ml={2}>
                                          <Typography variant="subtitle2" component="p">

                                          </Typography>
                                          <Typography variant="subtitle2" color="textSecondary" component="p">
                                              Date 2
                                          </Typography>
                                      </Box>
                                  </Box>
                                  <Box>
                                      <BookmarkBorderIcon />
                                  </Box>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                              <CardActionArea href="/">
                                  <CardMedia
                                      className={classes.media}
                                      image="https://www.collegeconsensus.com/wp-content/uploads/2016/12/o-HARVARD-UNIVERSITY-BUILDING-facebook.jpg"
                                      title="Contemplative Reptile"
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                        Harvard University
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Brief description
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions className={classes.cardActions}>
                                  <Box className={classes.author}>
                                      <Box ml={2}>
                                          <Typography variant="subtitle2" component="p">
                                          </Typography>
                                          <Typography variant="subtitle2" color="textSecondary" component="p">
                                              Date 3
                                          </Typography>
                                      </Box>
                                  </Box>
                                  <Box>
                                      <BookmarkBorderIcon />
                                  </Box>
                              </CardActions>
                          </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                              <CardActionArea href="/">
                                  <CardMedia
                                      className={classes.media}
                                      image="https://ischoolconnect.com/blog/wp-content/uploads/2018/12/31131766_205810363346714_1550189117445242880_n-1.jpg"
                                      title="Contemplative Reptile"
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                        MIT
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                          Brief description
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                              <CardActions className={classes.cardActions}>
                                  <Box className={classes.author}>
                                      <Box ml={2}>
                                          <Typography variant="subtitle2" component="p">

                                          </Typography>
                                          <Typography variant="subtitle2" color="textSecondary" component="p">
                                              Date 4
                                          </Typography>
                                      </Box>
                                  </Box>
                                  <Box>
                                      <BookmarkBorderIcon />
                                  </Box>
                              </CardActions>
                          </Card>
                      </Grid>
                  </Grid>
                  <Box my={4} className={classes.paginationContainer}>
                  </Box>
              </Container>
        </div>

      </React.Fragment>
    );
}

export default Schools;
