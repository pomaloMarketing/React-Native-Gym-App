import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';

const SimpleForm = ({ classDetails }) => {
  const { title } = classDetails;

  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [formStatus, setFormStatus] = useState('');

  const onSubmit = (data) => {
    const templateParams = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      'class-info': title,
    };

    emailjs.send(
      'service_nzph068',       // Your EmailJS Service ID
      'template_8lyd92n',       // Your EmailJS Template ID
      templateParams,
      '3et0LL_zaAzNX2NLw'       // Your EmailJS Public Key
    )
    .then((response) => {
      console.log('Email sent successfully:', response.text);
      setFormStatus('Thank you for signing up! We look forward to seeing you soon in class!');
      reset();
    })
    .catch((error) => {
      console.error('Error sending email:', error.text);
      setFormStatus('Something went wrong. Please try again.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up for {title}</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="phone"
        rules={{ required: 'Phone number is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
      {formStatus ? <Text style={styles.status}>{formStatus}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  status: {
    marginTop: 15,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default SimpleForm;
