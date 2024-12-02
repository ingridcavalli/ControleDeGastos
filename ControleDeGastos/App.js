import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [expenses, setExpenses] = useState([]);

    const addExpense = () => {
        if (description && value && category && date) {
            setExpenses([...expenses, { description, value: parseFloat(value), category, date }]);
            setDescription('');
            setValue('');
            setCategory('');
            setDate('');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const getTotalByCategory = (category) => {
        return expenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.value, 0)
            .toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Controle de Gastos</Text>
            <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Valor"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Categoria"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />
            <TextInput
                placeholder="Data (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
                style={styles.input}
            />
            <Button title="Adicionar Despesa" onPress={addExpense} />
            <FlatList
                data={expenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text>Descrição: {item.description}</Text>
                        <Text>Valor: R${item.value.toFixed(2)}</Text>
                        <Text>Categoria: {item.category}</Text>
                        <Text>Data: {item.date}</Text>
                    </View>
                )}
            />
            <Text style={styles.totalHeader}>Totais por Categoria:</Text>
            {['Alimentação', 'Transporte', 'Outros'].map(cat => (
                <Text key={cat}>
                    {cat}: R${getTotalByCategory(cat)}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: '#f9f9f9' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    expenseItem: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5, elevation: 1 },
    totalHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
});

export default App;
