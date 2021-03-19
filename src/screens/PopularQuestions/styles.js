import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  containerLight: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 400,
    marginTop: 50,
    borderRadius: 5,
  },
  containerDark: {
    alignSelf: 'center',
    backgroundColor: '#555555',
    width: 400,
    marginTop: 50,
    borderRadius: 5,
    borderColor: '#555555',
  },
  titleContainer: {
    top: 40,
    left: 20,
  },
  titleTextLight: {
    fontSize: 35,
    fontWeight: '200',
  },
  titleTextDark: {
    fontSize: 35,
    fontWeight: '200',
    color: 'white',
  },
  listSpinner: {
    marginTop: '50%',
  },
  dropdownHolder: {
    alignSelf: 'flex-end',
  },
  dropDownButton: {
    flexDirection: 'row',
    marginRight: 40,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    height: 30,
    width: 120,
    justifyContent: 'center',
  },
  arrow: {
    alignSelf: 'center',
    paddingLeft: 5,
  },
  dropDownTextLight: {
    color: '#4b4c4d',
    fontSize: 14,
    marginLeft: 3,
    alignSelf: 'center',
  },
  dropDownTextDark: {
    color: 'white',
    fontSize: 14,
    marginLeft: 3,
    alignSelf: 'center',
  },
  optionsContainer: {
    height: 70,
    marginRight: 30,
    right: 5,
    marginTop: 5,
    borderColor: 'lightgray',
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionTextLight: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 14,
    marginTop: 10,
  },
  optionTextDark: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    marginTop: 10,
  },
  chosenOptionText: {
    alignSelf: 'center',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chosenOptionButton: {
    backgroundColor: '#99cfe0',
    width: '100%',
    justifyContent: 'center',
    height: '50%',
    borderWidth: 1,
    borderColor: '#99cfe0',
    borderRadius: 6,
    marginTop: 6,
  },
  loadMoreButtonContainer: {
    alignSelf: 'center',
    marginTop: 50,
    height: 80,
  },
  loadMoreButton: {
    backgroundColor: '#1890ff',
    width: Dimensions.get('screen').width / 3.5,
    height: Dimensions.get('screen').height / 22,
    justifyContent: 'center',
    borderRadius: 6,
    borderColor: '#1890ff',
    borderWidth: 1,
  },
  loadMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default styles;
