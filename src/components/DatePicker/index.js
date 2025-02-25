// eslint no-use-before-define: 2

//
// DatePicker with an optional year.
//

import React, { Component } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
// import Picker from '@react-native-community/picker';

class BirthdayPicker extends Component {
  // eslint-disable-next-line
  static defaultProps = {
    selectedYear: new Date().getFullYear(), // Year to initialize the picker to (set to 0 to not have a year)
    selectedMonth: new Date().getMonth(), // Month to initialize the picker to
    selectedDay: new Date().getDate(), // Day to initialize the picker to
    yearsBack: 100, // How many years backwards (from starting year) you want to show

    onYearValueChange(year, idx) {}, // Function called when year changes
    onMonthValueChange(month, idx) {}, // Function called when month changes
    onDayValueChange(day, idx) {}, // Function called when day changes
  };

  constructor(props) {
    super(props);

    this.startingYear = this.props.selectedYear;
    this.state = {
      year: this.props.selectedYear,
      month: this.props.selectedMonth,
      day: this.props.selectedDay,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      year: nextProps.selectedYear,
      month: nextProps.selectedMonth,
      day: nextProps.selectedDay,
    });
  }

  // Tries to get the browser locale...
  getLocale() {
    if (navigator.language) {
      return navigator.language;
    }
    if (navigator.languages && navigator.languages.length > 0) {
      return navigator.languages[0];
    }
    return 'en-us'; // Default to English
  }

  // Loops through the months and gets the long name string...
  getMonthNames() {
    const locale = this.getLocale();
    const monthNames = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2000, i, 15);
      monthNames.push(date.toLocaleString(locale, { month: 'long' }));
    }
    return monthNames;
  }

  // Returns the number of days in the given month...
  getNumDaysInMonth(year, month) {
    // February is the only month that can change, so if there's no year, assume it has the maximum (29) days...
    return year == 0 && month == 1
      ? 29
      : new Date(year, month + 1, 0).getDate();
  }

  // Returns the <Picker.Item> values for the years...
  renderYearPickerItems() {
    // If year was 0, change it to current...
    const currentYear = new Date().getFullYear();
    let centerYear = this.startingYear;
    if (centerYear === 0) {
      centerYear = currentYear;
    }

    // Set starting and ending years...
    const startYear = centerYear - this.props.yearsBack;
    const endYear = currentYear;

    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    years.push(<Picker.Item label="----" value={0} key={0} />);
    return years;
  }

  // Returns the <Picker.Item> values for the months...
  renderMonthPickerItems() {
    const months = this.getMonthNames();
    return months.map((month, index) => (
      <Picker.Item label={month} value={index} key={index} />
    ));
  }

  // Returns the <Picker.Item> values for the days (based on current month/year)...
  renderDayPickerItems() {
    // February is the only day that can change, so if there's no year, assume it has the maximum (29) days...
    const numDays = this.getNumDaysInMonth(this.state.year, this.state.month);

    const days = [];
    for (let i = 1; i <= numDays; i++) {
      days.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    return days;
  }

  // Occurs when year value changes...
  onYearChange = (value, index) => {
    // Check if days are valid...
    const maxDays = this.getNumDaysInMonth(value, this.state.month);
    const day = this.state.day > maxDays ? maxDays : this.state.day;

    this.setState({ year: value, day });
    this.props.onYearValueChange(value, index);
  };

  // Occurs when month value changes...
  onMonthChange = (value, index) => {
    // Check if days are valid...
    const maxDays = this.getNumDaysInMonth(this.state.year, value);
    const day = this.state.day > maxDays ? maxDays : this.state.day;

    this.setState({ month: value, day });
    this.props.onMonthValueChange(value, index);
  };

  // Occurs when day value changes...
  onDayChange = (value, index) => {
    this.setState({ day: value });
    this.props.onDayValueChange(value, index);
  };

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.monthPicker}
          selectedValue={this.state.month}
          onValueChange={this.onMonthChange}
        >
          {this.renderMonthPickerItems()}
        </Picker>

        <Picker
          style={styles.dayPicker}
          selectedValue={this.state.day}
          onValueChange={this.onDayChange}
        >
          {this.renderDayPickerItems()}
        </Picker>

        <Picker
          style={styles.yearPicker}
          selectedValue={this.state.year}
          onValueChange={this.onYearChange}
        >
          {this.renderYearPickerItems()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  monthPicker: { flex: 3 },
  dayPicker: { flex: 1 },
  yearPicker: { flex: 2 },
});

export default BirthdayPicker;
