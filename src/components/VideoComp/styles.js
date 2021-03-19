import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: 40,
    borderColor: 'white',
    borderWidth: 3,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderTopStartRadius: 5,
    width: '80%',
    alignSelf: 'center',
  },
  cardImage: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  block: {
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignSelf: 'center',
    bottom: 0,
    width: '100%',
  },
  videPlayerStyle: {
    height: 350,
    width: 350,
  },
  videoXbutton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  videoXbuttonText: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentVideoContainer: {
    borderColor: 'red',
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    height: '70%',
  },
  currentVideoMainHolder: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    height: 400,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: '50%',
  },
  titleContainer: {
    paddingBottom: 30,
    justifyContent: 'center',
  },
  currentVideoTitleText: {
    fontSize: 15,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  borderBottomForCurVideo: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  currentVideoTitleAndButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
});

export default styles;
