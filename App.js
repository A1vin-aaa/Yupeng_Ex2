// App.js
import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer }     from '@react-navigation/native';
import { createStackNavigator }    from '@react-navigation/stack';
import {
    ScrollView,
    Text,
    Button,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

// --- Cart Context ---
const CartContext = createContext();
const useCart = () => useContext(CartContext);

// --- Sample Data ---
const PRODUCTS = [
    {
        id: '1',
        name: 'Soccer Ball',
        price: 19.99,
        image: require('./assets/images/soccer_ball.png'),
        category: 'Ball',
        description:
            'Official size 5 soccer ball made from durable PU leather, suitable for both training and match play.'
    },
    {
        id: '2',
        name: 'Basketball',
        price: 14.99,
        image: require('./assets/images/basketball_ball.jpg'),
        category: 'Ball',
        description:
            'Indoor/outdoor composite leather basketball with deep channels for superior grip and control.'
    },
    {
        id: '3',
        name: 'Tennis Racket',
        price: 89.99,
        image: require('./assets/images/tennis_racket.jpg'),
        category: 'Racket',
        description:
            'Lightweight graphite racket with large sweet spot and vibration-dampening handle for comfort.'
    },
    {
        id: '4',
        name: 'Tennis Balls (Pack of 3)',
        price: 9.99,
        image: require('./assets/images/tennis_balls.jpg'),
        category: 'Ball',
        description:
            'Pressurized tennis balls in a three-ball can, offering consistent bounce and durability.'
    },
    {
        id: '5',
        name: 'Baseball Glove',
        price: 49.99,
        image: require('./assets/images/baseball_glove.jpg'),
        category: 'Glove',
        description:
            'Professional-grade leather baseball glove with padded palm and reinforced webbing.'
    },
    {
        id: '6',
        name: 'Baseball Bat',
        price: 59.99,
        image: require('./assets/images/baseball_bat.jpg'),
        category: 'Bat',
        description:
            'Alloy baseball bat certified for league play, featuring an ergonomic grip for better swing control.'
    },
    {
        id: '7',
        name: 'Volleyball',
        price: 12.99,
        image: require('./assets/images/volleyball_ball.jpg'),
        category: 'Ball',
        description:
            'Soft-touch volleyball with nylon wound bladder, ideal for indoor and beach games.'
    },
    {
        id: '8',
        name: 'Skateboard',
        price: 49.99,
        image: require('./assets/images/skateboard_board.jpg'),
        category: 'Board',
        description:
            'Maple plywood deck skateboard with 52mm PU wheels and precision bearings for smooth rides.'
    },
    {
        id: '9',
        name: 'Snowboard',
        price: 199.99,
        image: require('./assets/images/snowboard_board.jpg'),
        category: 'Board',
        description:
            'All-mountain snowboard with camber profile, offering stability at speed and versatile carving.'
    }
];

// --- Home Screen (Category Selector) ---
function HomeScreen({ navigation }) {
    const categories = Array.from(
        new Set(PRODUCTS.map((p) => p.category))
    );

    return (
        <ScrollView contentContainerStyle={styles.homeContainer}>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    style={styles.homeButton}
                    onPress={() =>
                        navigation.navigate('Products', { filterCategory: cat })
                    }
                >
                    <Text style={styles.homeText}>{cat}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                key="cart-button"
                style={styles.homeButton}
                onPress={() => navigation.navigate('Cart')}
            >
                <Text style={styles.homeText}>Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// --- Products Screen ---
function ProductsScreen({ route, navigation }) {
    const { filterCategory } = route.params || {};
    const data = filterCategory
        ? PRODUCTS.filter((p) => p.category === filterCategory)
        : PRODUCTS;

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate('Details', { product: item })
                    }
                >
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>${item.price.toFixed(2)}</Text>
                </TouchableOpacity>
            )}
        />
    );
}

// --- Details Screen ---
function DetailsScreen({ route, navigation }) {
    const { product } = route.params;
    const { addToCart } = useCart();

    return (
        <ScrollView contentContainerStyle={styles.center}>
            <Image source={product.image} style={styles.imageLarge} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.desc}>{product.description}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Button
                title="Add to Cart"
                onPress={() => {
                    addToCart(product);
                    navigation.navigate('Cart');
                }}
            />
        </ScrollView>
    );
}

// --- Cart Screen ---
function CartScreen() {
    const { cart, clearCart } = useCart();
    const subtotal = cart.reduce((sum, p) => sum + p.price, 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;

    return (
        <ScrollView contentContainerStyle={styles.center}>
            <Text style={styles.title}>Your Cart</Text>
            {cart.length === 0 ? (
                <Text>No items added yet.</Text>
            ) : (
                <>
                    {cart.map((item, idx) => (
                        <Text key={item.id ?? idx}>
                            {item.name} – ${item.price.toFixed(2)}
                        </Text>
                    ))}
                    <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
                    <Text>Tax (13%): ${tax.toFixed(2)}</Text>
                    <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                    <Button title="Clear Cart" onPress={clearCart} />
                </>
            )}
        </ScrollView>
    );
}

// --- Navigation Setup ---
const Stack = createStackNavigator();

export default function App() {
    const [cart, setCart] = useState([]);
    const addToCart = (item) => setCart((prev) => [...prev, item]);
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Sport Shop"
                    screenOptions={{ headerTitleAlign: 'center' }}
                >
                    <Stack.Screen name="Sport Shop" component={HomeScreen} />
                    <Stack.Screen
                        name="Products"
                        component={ProductsScreen}
                        options={({ route }) => ({
                            title:
                                route.params?.filterCategory || 'All Products'
                        })}
                    />
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={({ route }) => ({
                            title: route.params.product.name
                        })}
                    />
                    <Stack.Screen name="Cart" component={CartScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartContext.Provider>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    homeButton: {
        marginVertical: 12,
        padding: 16,
        backgroundColor: '#ddd',
        borderRadius: 8,
        width: '80%',
        alignItems: 'center'
    },
    homeText: {
        fontSize: 18,
        fontWeight: '600'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    list: {
        padding: 16
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        elevation: 3
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8
    },
    imageLarge: {
        width: 200,
        height: 200,
        marginBottom: 16
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    desc: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 8,
        textAlign: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: '600'
    },
    price: {
        fontSize: 18,
        marginVertical: 8
    },
    total: {
        fontSize: 18,
        marginVertical: 12,
        fontWeight: '700'
    }
});
