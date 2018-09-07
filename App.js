import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { Button, Header, ListItem, Divider} from 'react-native-elements';
import SideMenu from 'react-native-side-menu'

class ContentView extends React.Component{
  // props viewType of types myPlanner, myNotes, communityNotes, myHistory, about
  constructor(props){
    super(props);
  }

  render() {
    viewType = this.props.viewType;

    if(viewType == "myPlanner"){
      return(<MyPlanner/>);
    } else if (viewType == "myNotes") {
      return(<MyNotes/>);
    } else if (viewType == "communityNotes") {
      return(<CommunityNotes/>);
    } else if (viewType == "myHistory") {
      return(<MyHistory/>);
    } else if (viewType == "about") {
      return(<About/>);
    } else {
      return(<Home/>);
    }

  }
}


class HeaderView extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress : this.props.toggleSideMenu }}
          centerComponent={{ text: 'Note Taker', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff', onPress: this.props.goToHome }}
          outerContainerStyles={{width:'100%'}}
        />
        <ContentView viewType={this.props.viewType}/>
      </View>
    );
  }
}


// Controls the side menu and is the primary view
export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
      mainView: 'default'
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }



  render() {
  	//Create the menu list objects first
  	const list = [
	  {
	    title: 'My Planner',
	    icon: 'calendar',
	    iconType: 'material-community',
	    buttonPress: () => { 
	    	this.setState({
	    		mainView: 'myPlanner',
	    		isOpen: false
	    	}) 
	    } 
	  },
	  {
	    title: 'My Notes',
	    icon: 'clipboard-notes',
	    iconType: 'foundation',
	    buttonPress: () => { 
	    	this.setState({
	    		mainView: 'myNotes',
	    		isOpen: false 
	    	})
	    } 
	  },
	  {
	    title: 'Community Notes',
	    icon: 'md-people',
	    iconType: 'ionicon',
	    buttonPress: () => { 
	    	this.setState({
	    		mainView: 'communityNotes',
	    		isOpen: false 
	    	})
	    } 
	  },
	  {
	    title: 'My History',
	    icon: 'chart-timeline',
	    iconType: 'material-community',
	    buttonPress: () => { 
	    	this.setState({
	    		mainView: 'myHistory',
	    		isOpen: false 
	    	})
	    } 
	  },
	  {
	    title: 'About',
	    icon: 'question-circle',
	    iconType: 'font-awesome',
	    buttonPress: () => { 
	    	this.setState({
	    		mainView: 'about',
	    		isOpen: false 
	    })
	    } 
	  },
	]

    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
		{list.map((item, i) => (
		    <ListItem
		    key={i}
		    title={item.title}
		    leftIcon={{ name: item.icon, type: item.iconType}}
		    onPress= {item.buttonPress}

		    />
		))}
      </View>

    )

    return (
      <SideMenu isOpen={this.state.isOpen} menu={MenuComponent}>
        <HeaderView 
        	toggleSideMenu={this.toggleSideMenu.bind(this)} 
        	viewType={this.state.mainView}
        	goToHome={() => {
        			this.setState({mainView: 'default'})
        		}}
        />
      </SideMenu>
    );
  }

}

class Home extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text> home </Text>
      </View>
    );
  }
}


class MyPlanner extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text> myPlanner </Text>
      </View>
    );
  }
}


class MyNotes extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <NoteComponent name='NAME' date= 'DATE' subject='SUBJECT'/>
        <Text> Hello here are lots of words that should spill on to the next line to see how large the container is</Text>
      </View>
    );
  }
}

class CommunityNotes extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text> communityNotes </Text>

      </View>
    );
  }
}

class MyHistory extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text> myHistory </Text>
      </View>
    );
  }
}

class About extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text> about </Text>
      </View>
    );
  }
}

class NoteComponent extends React.Component{
  //PROPS: name, date, subject
  constructor(props){
    super(props);
  }

  render() {

    return (
      <View style={styles.horizontalCard}>
      	<ImageBackground style={{flex: 1, marginBottom: 3}} source={require('./images/noteThumbnailBackground.png')}>
      		<Image style={{height: '100%', width: 96}} source={require('./images/sampleNoteThumbnail.png')} />
      	</ImageBackground>
      	<View style={{flexDirection: 'column', flex: 2, marginLeft: 10}}>
      		<View style={{flex:1}}>
      			<Text style={styles.regularTextCard}>{this.props.name}</Text>
      			<Text style={styles.minorTextCard}>{this.props.subject}</Text>   
      		</View>
      		<View style={{flex:1, justifyContent: 'flex-end', marginBottom: 10}}>
      			<Text style={styles.minorTextCard}>{this.props.date}</Text>	    	
      		</View>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  // styling for card that is vertically thin and horizontally long
  horizontalCard: { 
  	marginTop: 7,
  	alignSelf: 'stretch',
  	marginRight: 5,
  	marginLeft: 5,
  	height: 100,
  	backgroundColor: 'white',
  	borderBottomColor: '#E5DFDE',
  	borderBottomWidth: 1,
  	flexDirection: 'row',
  	justifyContent: 'center',
  },
  regularTextCard:{
  	color: 'black',
  	fontSize: 15,
  },
  minorTextCard:{
  	color: '#B8B0AF',
  	fontSize: 12,
  }
});
