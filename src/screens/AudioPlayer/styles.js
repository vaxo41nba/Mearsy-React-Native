import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  audioThumb: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  audioThumbLittle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  authorTitle: {
    flex: 1,
  },
  author: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  authorPlaying: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    // backgroundColor: 'white',
    height: 57,
    paddingRight: 10,
  },
  control: {
    marginHorizontal: 2,
  },
  containerLight: {
    marginTop: '15%',
    height: '70%',
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    flex: 1,
  },
  containerDark: {
    marginTop: '15%',
    height: '70%',
    margin: 20,
    padding: 20,
    backgroundColor: '#555555',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555555',
    flex: 1,
  },
  lineLight: {
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  lineDark: {
    borderBottomWidth: 1,
    marginVertical: 15,
    borderBottomColor: 'white',
  },
  playingBlock: {
    display: 'flex',
  },
  titleLight: {
    fontSize: 20,
  },
  titleDark: {
    fontSize: 20,
    color: 'white',
  },
});

export default styles;
