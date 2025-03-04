// CalendarComponent.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarComponent = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState("");

  // Define recurring events
  const events = [ {}
   
  ];

  const onDayPress = (day) => {
    const formattedDate = day.dateString;
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
  };

  const filteredEvents = events.filter(event => event.date === selectedDate);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => console.log(item.link)}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text>{item.time}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <Calendar
      onDayPress={onDayPress}
      markedDates={{
        [selectedDate]: { selected: true, marked: true },
      }}
      style={styles.calendar}
    />
    {selectedDate ? (
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.title}
        style={styles.eventList}
      />
    ) : (
      <Text style={styles.noEventsText}>Select a date to see events.</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  calendar: {
    marginBottom: 20,
  },
  eventList: {
    marginTop: 10,
  },
  eventItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  eventTitle: {
    fontWeight: 'bold',
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CalendarComponent;
