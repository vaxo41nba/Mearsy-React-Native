import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  blockLight: {
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke',
    alignSelf: 'center',
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: 'whitesmoke',
  },
  blockDark: {
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#353839',
    alignSelf: 'center',
    width: '100%',
    height: 150,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 5,
    height: Dimensions.get('screen').height / 2.45,
  },
  cardImage: {
    height: '60%',
    resizeMode: 'cover',
  },
  cardTitleLight: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  cardTitleDark: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardTextLight: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  cardTextDark: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  dateTextLight: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  dateTextDark: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  readMoreButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    height: 30,
    width: 80,
  },
  readMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
  },
  dateAndButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editAndDeleteButtonContainer: {
    alignSelf: 'flex-end',
    bottom: 20,
  },
  downloadAndReadMore: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
});

export default styles;
