import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  activeCategoriesButton: {
    height: 32,
    marginLeft: 12,
    backgroundColor: '#F8F8F8',
    borderColor: '#1890ff',
    borderWidth: 1.8,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  chosenActiveCategoriesButton: {
    height: 32,
    marginLeft: 12,
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
    borderWidth: 1.8,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  activeCategoriesButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#1890ff',
  },
});

export default styles;
