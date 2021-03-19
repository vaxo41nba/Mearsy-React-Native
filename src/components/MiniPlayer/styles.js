import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  imageContainer: {
    height: 50,
    width: 50,
  },
  infoText: {
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  mainButtonContainers: {
    width: '50%',
  },
  iconsContainer: {
    width: '50%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  iconPosition: {
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
});

export default styles;
