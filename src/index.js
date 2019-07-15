import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import * as serviceWorker from './serviceWorker';
import {colors, PropTypes} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import GroupIcon from "@material-ui/icons/Group";
import GetAppIcon from "@material-ui/icons/GetApp";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import  Axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
const useStyles = makeStyles(theme => ({
    appBar:{
        textAlign:'center',
      background: colors.pink["400"],
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        color:"#FFFFFF",
       //marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

 const MainPage=()=> {
     var classes = useStyles();
         const [state, setState] = React.useState({
             top: false,
             left: false,
             bottom: false,
             right: false,
         });
     const toggleDrawer = (side, open) => event => {
         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
             return;
         }

         setState({ ...state, [side]: open });
     };

     const sideList = side => (
         <div
             className={classes.list}
             role="presentation"
             onClick={toggleDrawer(side, false)}
             onKeyDown={toggleDrawer(side, false)}
         >
             <AppBar position="static"  className={classes.appBar}>
                 <Toolbar>
                     <IconButton edge="start"  aria-label="返回"  onClick={toggleDrawer('left',false)} className={classes.menuButton} color="inherit" >
                         <ArrowBackIcon></ArrowBackIcon>
                     </IconButton>
                     <Typography variant="h6" className={classes.title}>
                         喝茶看番
                     </Typography>
                     {/*<Container maxWidth={false}>
                         <Grid container={true} spacing={4}>
                             <Grid item={true}  xs={4}>
                                 <IconButton  className={classes.menuButton}  >
                                     <MenuIcon />
                                 </IconButton>
                            </Grid>
                            <Grid item={true} xs={4} >
                               <Typography variant={"h6"} className={classes.title}>喝茶看番</Typography >
                           </Grid>
                         </Grid>
                     </Container>*/}
                 </Toolbar>
             </AppBar>
             <Divider></Divider>
         </div>
     );
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Container maxWidth={false} >
                        <Grid container={true} spacing={3}>
                            <Grid item={true} xs={3}>
                                <IconButton className={classes.menuButton} onClick={toggleDrawer('left', true)} >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        <Grid item={true} xs={3}>
                            <IconButton  className={classes.menuButton}  >
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    <Grid item={true} xs={3}>
                        <IconButton className={classes.menuButton}  >
                            <LiveTvIcon />
                        </IconButton>
                    </Grid>
                <Grid item={true} xs={3}>
                    <IconButton  className={classes.menuButton}  >
                        <VideoLibraryIcon />
                    </IconButton>
                </Grid>
            </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
            <div id='manlist'>
            </div>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
ReactDOM.render(<MainPage/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
const listStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));
Axios.get("https://b.i-bara.com/getwd").then(res=>{
    let tileData =res.data[0];
   const mainList=
            <div className={listStyles.root}>
              <GridList className={listStyles.gridList} cols={tileData.length}>
                  {tileData.map(tile => (
                      <GridListTile key={tile.name}>
                          <Card style={{display:'flex',width:210}}>
                              <CardContent>
                                  <img src={tile.coverUrl} alt={tile.name}/>
                              </CardContent>
                          </Card>
                      </GridListTile>
                  ))}
                </GridList>
            </div>
    ReactDOM.render(mainList, document.getElementById('manlist'));
    console.log(res.data);
});
