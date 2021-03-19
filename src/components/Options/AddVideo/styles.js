import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: '#F8F8F8',
    width: '95%',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 20,
    paddingTop: 10,
  },

  containerLight: {
    width: '95%',
    backgroundColor: '#555555',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 20,
    paddingTop: 10,
  },

  articlesContainerLight: {
    backgroundColor: '#F8F8F8',
    width: '95%',
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 10,
  },

  articlesContainerDark: {
    backgroundColor: '#555555',
    width: '95%',
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 10,
  },

  addVideoLight: {
    color: '#E8E8E8',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 15,
    marginTop: 20,
  },
  addVideoDark: {
    color: '#606060',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 15,
    marginTop: 20,
  },
  addVideoSection: {
    flexDirection: 'row',
  },
  input: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 40,
    width: '68%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  inputText: {
    color: 'gray',
  },
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  instructionTextLight: {
    color: '#E8E8E8',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  instructionTextDark: {
    color: '#606060',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  isRequiredSymbol: {
    color: 'red',
    marginLeft: 4,
  },
  categoryContainer: {
    height: 120,
    width: '77%',
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryText: {
    color: 'gray',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1890ff',
  },
  buttonText: {
    color: 'white',
  },
  buttonsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default styles;
