// App.js
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert

} from 'react-native';

export default function App() {
    // --- Directories with messages ---
    const [directories, setDirectories] = useState([
        {
            id: 'd1',
            name: 'You',
            messages: [
                { id: 'm1', text: 'Believe in yourself—you are capable of amazing things.' },
                { id: 'm2', text: 'Self-care isn’t selfish; it’s medicine for the soul.' }
            ]
        },
        {
            id: 'd2',
            name: 'Home',
            messages: [
                { id: 'm1', text: 'Home is where your story begins.' },
                { id: 'm2', text: 'There’s no place like home.' }
            ]
        },
        {
            id: 'd3',
            name: 'Love',
            messages: [
                { id: 'm1', text: 'Love is composed of a single soul inhabiting two bodies.' },
                { id: 'm2', text: 'Where there is love there is life.' }
            ]
        },
        {
            id: 'd4',
            name: 'Family',
            messages: [
                { id: 'm1', text: 'Family: where life begins and love never ends.' },
                { id: 'm2', text: 'Rejoice with your family in the beautiful land of life.' }
            ]
        },
        {
            id: 'd5',
            name: 'Friends',
            messages: [
                { id: 'm1', text: 'Friendship doubles our joys and divides our sorrows.' },
                { id: 'm2', text: 'A real friend is one who walks in when the rest walk out.' }
            ]
        },
        {
            id: 'd6',
            name: 'School',
            messages: [
                { id: 'm1', text: 'Education is the most powerful weapon you can use to change the world.' },
                { id: 'm2', text: 'The roots of education are bitter, but the fruit is sweet.' }
            ]
        }
    ]);

    // UI state
    const [selectedDirId, setSelectedDirId] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');
    const [editMessageId, setEditMessageId] = useState(null);
    const [newDirName, setNewDirName] = useState('');

    // Helpers
    const selectedDir = directories.find(d => d.id === selectedDirId);

    // Add or update a message
    const handleSend = () => {
        if (!newMessageText.trim()) return;
        setDirectories(directories.map(dir => {
            if (dir.id !== selectedDirId) return dir;
            if (editMessageId) {
                // Edit existing
                return {
                    ...dir,
                    messages: dir.messages.map(m =>
                        m.id === editMessageId ? { ...m, text: newMessageText.trim() } : m
                    )
                };
            } else {
                // Add new
                const nextId = `m${dir.messages.length + 1}`;
                return {
                    ...dir,
                    messages: [...dir.messages, { id: nextId, text: newMessageText.trim() }]
                };
            }
        }));
        setNewMessageText('');
        setEditMessageId(null);
    };

    // Delete a message
    const handleDeleteMessage = (msgId) => {
        setDirectories(directories.map(dir => {
            if (dir.id !== selectedDirId) return dir;
            return {
                ...dir,
                messages: dir.messages.filter(m => m.id !== msgId)
            };
        }));
    };

    // Start editing a message
    const handleEditMessage = (msg) => {
        setNewMessageText(msg.text);
        setEditMessageId(msg.id);
    };

    // Add a new directory
    const handleAddDirectory = () => {
        const name = newDirName.trim();
        if (!name) return;
        const nextId = `d${directories.length + 1}`;
        setDirectories([...directories, { id: nextId, name, messages: [] }]);
        setNewDirName('');
    };

    // Back from messages to directory list
    const handleBack = () => {
        setSelectedDirId(null);
        setNewMessageText('');
        setEditMessageId(null);
    };

    // --- Render ---

    // 1) Directory list view
    if (!selectedDir) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Message Directories</Text>
                <View style={styles.newDirContainer}>
                    <TextInput
                        style={styles.newDirInput}
                        placeholder="New directory name"
                        value={newDirName}
                        onChangeText={setNewDirName}
                    />
                    <Button title="Add" onPress={handleAddDirectory} />
                </View>
                <FlatList
                    data={directories}
                    keyExtractor={d => d.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.dirButton}
                            onPress={() => setSelectedDirId(item.id)}
                        >
                            <Text style={styles.dirText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
    }

    // 2) Messages view
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{selectedDir.name}</Text>

            <FlatList
                data={selectedDir.messages}
                keyExtractor={m => m.id}
                contentContainerStyle={styles.messagesList}
                renderItem={({ item }) => (
                    <View style={styles.messageRow}>
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                        <View style={styles.msgActions}>
                            <TouchableOpacity onPress={() => handleEditMessage(item)}>
                                <Text style={styles.actionText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteMessage(item.id)}>
                                <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={60}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message…"
                        value={newMessageText}
                        onChangeText={setNewMessageText}
                    />
                    <Button title={editMessageId ? "Update" : "Send"} onPress={handleSend} />
                </View>
            </KeyboardAvoidingView>

            <Button title="Back to Directories" onPress={handleBack} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
    newDirContainer: { flexDirection: 'row', marginBottom: 12 },
    newDirInput: {
        flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 6,
        paddingHorizontal: 12, marginRight: 8
    },
    dirButton: { padding: 16, backgroundColor: '#e0e0e0', borderRadius: 6, marginBottom: 8 },
    dirText: { fontSize: 18, textAlign: 'center' },
    messagesList: { paddingVertical: 8 },
    messageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    messageBubble: {
        flex: 1, backgroundColor: '#f1f1f1', padding: 12, borderRadius: 6
    },
    messageText: { fontSize: 16 },
    msgActions: { flexDirection: 'row', marginLeft: 8 },
    actionText: { marginHorizontal: 4, color: '#007AFF' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    input: {
        flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 6,
        paddingHorizontal: 12, paddingVertical: 8, marginRight: 8
    }
});
