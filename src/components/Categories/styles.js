import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chosenCategories: {
    padding: 5,
    marginRight: 10,
    marginTop: 8,
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledCategories: {
    padding: 5,
    marginRight: 10,
    marginTop: 8,
    backgroundColor: 'white',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledButton: {
    padding: 5,
    marginRight: 10,
    marginTop: 8,
    backgroundColor: 'rgb(235,235,228)',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledchosenButton: {
    padding: 5,
    marginRight: 10,
    marginTop: 8,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledButtonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  categoriesText: {
    color: '#1890ff',
    fontWeight: 'bold',
  },
  chosenCategoriesText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
