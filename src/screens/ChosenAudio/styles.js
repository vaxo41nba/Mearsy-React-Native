import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    marginTop: '20%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  containerDark: {
    marginTop: '20%',
    alignSelf: 'center',
    backgroundColor: '#555555',
    width: '95%',
    borderWidth: 1,
    borderRadius: 5,
  },
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
    width: 270,
    height: 250,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  author: {
    fontSize: 14,
    marginLeft: 45,
    marginTop: 10,
  },
  authorDark: {
    fontSize: 14,
    marginLeft: 45,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  titlePlaying: {
    fontSize: 16,
    marginLeft: 45,
    marginTop: 10,
    fontWeight: 'bold',
  },
  titlePlayingDark: {
    fontSize: 16,
    marginLeft: 45,
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    height: 57,
    paddingRight: 10,
    alignSelf: 'center',
  },
  control: {
    marginHorizontal: 2,
  },
  imageContainer: {
    justifyContent: 'center',
    marginTop: '10%',
  },
  timeText: {
    marginLeft: 50,
    fontWeight: 'bold',
    fontSize: 12,
  },
  timeTextDark: {
    marginLeft: 50,
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  pauseCircle: {
    marginHorizontal: 2,
    alignSelf: 'center',
  },
  playPauseContainer: {
    width: '35%',
  },
  volumeAndtime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  volumeIconAndSlider: {
    flexDirection: 'row',
  },
  closeButton: {
    alignSelf: 'flex-end',
    bottom: 10,
    left: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default styles;
