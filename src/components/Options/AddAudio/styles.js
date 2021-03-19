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

  titleText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  uploadTextLight: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#E8E8E8',
    fontSize: 18,
  },
  uploadTextDark: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#606060',
    fontSize: 18,
  },
  titlesLight: {
    fontWeight: 'bold',
    color: '#F8F8F8',
  },
  titlesDark: {
    fontWeight: 'bold',
    color: '#606060',
  },

  isRequiredSymbol: {
    color: 'red',
    marginLeft: 4,
  },

  buttonsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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

  uploadLogo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default styles;
