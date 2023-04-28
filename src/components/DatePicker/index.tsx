import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "native-base";
import { MaterialIcons } from "@native-base/icons";
import moment from "moment";

const MyDatePicker = ({ onDateSelection }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formatedDate = moment(currentDate).format('YYYY-MM-DD')
    setShow(false);
    setDate(currentDate);
    onDateSelection(formatedDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };

  return (
    <>
      <Icon as={MaterialIcons} name="mode-edit" size={6} color="gray.200" onPress={showDatepicker} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default MyDatePicker;
