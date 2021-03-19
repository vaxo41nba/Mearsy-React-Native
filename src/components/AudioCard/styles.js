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
  authorLight: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  authorDark: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  titleLeDark: {
    color: 'white',
  },
  authorPlaying: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
  },
  control: {
    marginHorizontal: 2,
  },
  container: {
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
  line: {
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  playingBlock: {
    display: 'flex',
  },
  title: {
    fontSize: 20,
  },
});

export default styles;
