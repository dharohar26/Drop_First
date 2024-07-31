//import liraries
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, StatusBar, TouchableOpacity, Modal, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import SharedPreferences from 'react-native-shared-preferences';
import DateTimePicker from '@react-native-community/datetimepicker';

// create a component
const ClubBooking = ({ navigation }) => {

    const [bookReservation, setBookReservation] = useState("");
    const [buttonVisible, setButtonVisible] = useState(true);
    const [date, setDate] = useState("");
    const [open, setOpen] = useState('');
    const [dob, setDob] = useState('');
    const [currentIndex, setCurrentIndex] = useState("");
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [userGender, setUserGender] = useState("");
    const [location, setLocation] = useState([]);
    const [artists, setArtists] = useState("");
    const [profilePictures, setProfilePictures] = useState([]);
    const [time, setTime] = useState("");
    const [male, setMale] = useState("");
    const [quantity, setQuantity] = useState({});
    const [loading, setLoading] = useState(false);
    const [maleAmount, setMaleAmount] = useState(0);
    const [femaleAmount, setFemaleAmount] = useState(0);
    const [coupleAmount, setCoupleAmount] = useState(0);
    const [coupleNote, setCoupleNote] = useState("");
    const [venueId, setVenueId] = useState("")
    const [token, setTokenVal] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const [venueTimings, setVenueTimings] = useState("");
    const [events, setEvents] = useState("");
    const [eventId, setEventId] = useState("");

    // Function to format date as DD/MM/YYYY
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to format time as HH:MM AM/PM
    const formatTime = (time) => {
        const hours = time.getHours() % 12 || 12;
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${ampm}`;
    };

    const onRefresh = () => {
        // Set refreshing state to true
        setRefreshing(true);
        // Fetch data again
        venueDetails();
        userCategory();
        reservePrice();
        // Set refreshing state to false when done
        setRefreshing(false);
    };
    const handleEventPress = (event) => {
        navigation.navigate('offerlist', { event });
    };

    const increment = (item) => {
        const updatedQuantity = {
            ...quantity,
            [item.name]: (quantity[item.name] || 0) + 1
        };
        setQuantity(updatedQuantity);

        // Update male amount based on the category
        if (item.name === 'Male') {
            setMaleAmount(prevAmount => prevAmount + male);
        }
    };

    SharedPreferences.getItem("venueId", function (value) {
        setVenueId(value);
        console.log("VENID", value);
    });
    SharedPreferences.getItem("eventId", function (value) {
        setEventId(value);
        console.log("eventId--", value);
    });

    const decrement = (item) => {
        if (quantity[item.name] > 0) {
            const updatedQuantity = {
                ...quantity,
                [item.name]: quantity[item.name] - 1
            };
            setQuantity(updatedQuantity);
            // Update male amount based on the category
            if (item.name === 'Male') {
                setMaleAmount(prevAmount => Math.max(0, prevAmount - male));
            }
        }
    };

    const calculateTotalAmount = () => {
        const maleAmount = calculateMaleAmount();
        const femaleAmount = calculateFemaleAmount();
        const coupleAmount = calculateCoupleAmount();
        return maleAmount + femaleAmount + coupleAmount;
    };

    const venueDetails = async () => {
        try {
            setLoading(true);
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                setTokenVal(value);
                console.log("homeToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Main API calling function        
                    fetch(`http://62.72.57.205:8092/user/getVenueById/${venueId}`, requestOptions)
                        .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                const data = await response.json();
                                throw new Error(data.message || 'Request failed with statuss ' + response.status);
                            }
                        })
                        .then(responseData => {
                            console.log("API Response =>", responseData);
                            setName(responseData.result.name);
                            setLocation(responseData.result.location)
                            setBio(responseData.result.bio)
                            setArtists(responseData.artists)
                            console.log("photos", responseData.artists)

                            const venueTimings = responseData.result.venueTimings.map(schedule => {
                                return {
                                    day: schedule.day,
                                    startTime: schedule.startTime,
                                    endTime: schedule.endTime
                                };
                            });
                            setVenueTimings(venueTimings);

                            const events = responseData.result.events.map(event => {
                                return {
                                    id: event.id,
                                    name: event.name,
                                    startTime: event.startTime,
                                    endTime: event.endTime,
                                    date: event.date
                                };
                            });
                            // setEvents(events);
                            setEvents(responseData.result.events.map(event => ({
                                ...event,
                                offers: event.offers || [],
                            })));

                            if (Array.isArray(responseData.result.profilePictures)) {
                                const profilePictures = responseData.result.profilePictures.map(profile => profile);
                                setProfilePictures(profilePictures);
                                console.log("My Picture:", profilePictures);
                            }

                            responseData.result.events.forEach(event => {
                                SharedPreferences.setItem("eventId", event.id.toString());
                                console.log(`Saved event ID ${event.id} to SharedPreferences`);
                            });

                            console.log("events", events);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            // Display alert for error
                            setLoading(false);
                        });
                } else {
                    console.log("No token available.");
                    setLoading(false);
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (venueId !== "") {
            venueDetails();
        }
    }, [venueId]); // Run whenever venueId changes

    // Function to calculate total amount for male guests
    const calculateMaleAmount = () => {
        return maleAmount * (quantity['Male'] || 0);
    };

    // Function to calculate total amount for female guests
    const calculateFemaleAmount = () => {
        return femaleAmount * (quantity['Female'] || 0);
    };

    // Function to calculate total amount for couple guests
    const calculateCoupleAmount = () => {
        return coupleAmount * (quantity['Couple'] || 0);
    };

    // Render function for each guest category
    const renderGuestCategory = (category, totalAmount) => {
        return (
            <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.9), marginTop: 10 }}>
                {category}
            </Text>
        );
    };

    const renderItem = ({ item }) => {

        let categoryAmount = 0;
        // Determine the amount based on the category
        switch (item.name) {
            case 'Male':
                categoryAmount = calculateMaleAmount();
                break;
            case 'Female':
                categoryAmount = calculateFemaleAmount();
                break;
            case 'Couple':
                categoryAmount = calculateCoupleAmount();
                break;
            default:
                break;
        }

        return (
            <View>
                <View style={styles.femaleStage}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), marginTop: 10 }}>
                        {item.name} <Text style={{ color: '#808080', fontSize: responsiveFontSize(1.9) }}>
                            {categoryAmount}
                        </Text>
                    </Text>

                    <TouchableOpacity onPress={() => decrement(item)}>
                        <Image source={require('./../../assets/icon/minus.png')}
                            style={{ height: 24, width: 24, left: 15, marginTop: 10 }} />
                    </TouchableOpacity>

                    <Text style={{ color: '#fff', marginTop: 10 }}>{quantity[item.name] || 0}</Text>

                    <TouchableOpacity onPress={() => increment(item)}>
                        <Image source={require('./../../assets/icon/Plus.png')}
                            style={{ height: 24, width: 24, right: 15, marginTop: 10 }} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.femaleStageText}>Free entries will be allowed before 9 pm</Text>
            </View>
        );
    };

    const ref = useRef();

    const toggleTimePicker = () => {
        setTimePickerVisible(!timePickerVisible);
    };

    const toggleReservation = () => {
        setBookReservation(!bookReservation); // Toggle visibility state
        setButtonVisible(false); // Hide the button when reservation is made
    };

    const goBack = () => {
        navigation.goBack();
    };

    const userCategory = async () => {
        try {
            var SharedPreferences = require('react-native-shared-preferences');
            SharedPreferences.getItem("token", function (value) {
                console.log("homeToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Main API calling function
                    fetch("http://62.72.57.205:8092/user/getAllUserCatgory", requestOptions)
                        .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                const data = await response.json();
                                throw new Error(data.message || 'Request failed with sttatus ' + response.status);
                            }
                        })
                        .then(responseData => {
                            console.log("API Response:", responseData);
                            if (responseData.result) {
                                setUserGender(responseData.result);
                                console.log("set", responseData.result);
                            }
                        })
                        .catch(error => {
                            console.log("API Error:", error);
                            // Display alert for error
                            // Alert.alert("Error", error.message || "Unknown error occurred");
                            setLoading(false);
                        });
                } else {
                    console.log("No token available.");
                    setLoading(false);
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };

    useEffect((item) => {
        userCategory();
    }, []);

    const reservePrice = async () => {
        try {
            SharedPreferences.getItem("token", function (value) {
                console.log("homeToken", value);

                if (value) {
                    const myHeaders = new Headers();
                    myHeaders.append("Authorization", value);

                    const requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow"
                    };

                    // Main API calling function
                    const apiUrl = `http://62.72.57.205:8092/venue/getReservationPriceDetails/${eventId}`
                    console.log('priceUrl', apiUrl);
                    fetch(apiUrl, requestOptions)
                        .then(async response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                const data = await response.json();
                                throw new Error(data.message || 'Request failed with status ' + response.status);
                            }
                        })
                        .then(response => {
                            console.log("API Response price:", response);
                            if (response.result) {
                                const { maleAmount, femaleAmount, coupleAmount, coupleNote } = response.result;
                                // Set the state variables with the retrieved amounts
                                setMaleAmount(maleAmount);
                                setFemaleAmount(femaleAmount);
                                setCoupleAmount(coupleAmount);
                                setCoupleNote(coupleNote);
                            } else {
                                console.log("Response does not contain result:", response);
                                throw new Error("Data not found in the response");
                            }
                        })
                        .catch(error => {
                            console.log("API Error for:", error.message || error);
                            // Display alert for error
                            setLoading(false);
                        });
                } else {
                    console.log("No token available.");
                    setLoading(false);
                }
            });
        } catch (error) {
            console.log("Error retrieving token:", error);
        }
    };
    useEffect((item) => {
        reservePrice();
    }, [eventId]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000000" barStyle="dark-content" />
            {loading ? ( // Show loader if loading state is true
                <ActivityIndicator size="large" color="#E16DFF" />
            ) : (

                <ImageBackground source={require('./../../assets/icon/SignBackground.png')}
                    style={{ height: responsiveHeight(100), width: responsiveWidth(100), alignSelf: 'center' }}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>
                        <ImageBackground source={require('./../../assets/icon/Rectangle.png')}
                            style={{
                                height: 300, width: responsiveWidth(100), alignSelf: 'center'
                            }} >

                            <TouchableOpacity onPress={goBack}>
                                <Image source={require('./../../assets/icon/before.png')}
                                    style={{
                                        height: 34, width: 34, marginLeft: 20, marginTop: 20
                                    }} />
                            </TouchableOpacity>

                            <Text style={styles.clubText}>{name}</Text>

                            <View style={styles.location}>
                                <Image source={require('./../../assets/icon/locate.png')}
                                    style={{
                                        height: 13, width: 11.90, marginLeft: 35, top: 2
                                    }} />

                                <Text style={styles.Hritik}>{location}</Text>
                            </View>
                        </ImageBackground>

                        <Text ellipsizeMode="tail" style={styles.discription}>{bio}</Text>

                        {buttonVisible && (
                            <TouchableOpacity style={styles.bookButton} onPress={toggleReservation}>
                                <Text style={styles.need}>Need a reservation?<Text style={styles.book}> Book here</Text></Text>
                            </TouchableOpacity>
                        )}

                        {bookReservation && (
                            <View>
                                <Text style={styles.reserve}>Book your reservation</Text>
                                <View style={styles.toggle}>
                                    <View style={styles.dateView}>
                                        <Text style={styles.date}>Select Date</Text>
                                        <Text style={styles.time}>Time</Text>
                                    </View>

                                    <View style={styles.calenderView}>
                                        <View>
                                            <DatePicker
                                                modal
                                                mode="date"
                                                open={open}
                                                date={date instanceof Date ? date : new Date()} // Ensure date is a Date object
                                                onConfirm={(selectedDate) => {
                                                    setOpen(false);
                                                    setDate(selectedDate);
                                                    setDob(selectedDate.toISOString()); // Set Date of Birth here
                                                }}
                                                onCancel={() => {
                                                    setOpen(false);
                                                }}
                                                customStyles={{
                                                    dateText: {
                                                        color: '#FFFFFF',
                                                        fontSize: 20, // adjust the font size as needed
                                                        fontWeight: 'bold', // adjust the font weight as needed
                                                    },
                                                }}
                                            />

                                            <TouchableOpacity
                                                onPress={() => setOpen(true)} style={{ justifyContent: 'center', height: 50, width: responsiveWidth(41), alignSelf: 'center', marginTop: responsiveHeight(0.5), borderRadius: 30, backgroundColor: 'rgba(51, 51, 51, 0.5)', marginLeft: 10 }}>

                                                <Image source={require('./../../assets/icon/calendar.png')}
                                                    style={{ height: 14, width: 14, marginLeft: responsiveWidth(31), top: 7 }} />

                                                {/* <Text style={{ marginLeft: 30, color: date ? "#d3d3d3" : '#d3d3d3', bottom: 8 }}>{date ? date.toLocaleDateString() : "02/4/2023"}</Text> */}
                                                <Text style={{ marginLeft: 30, color: date ? "#d3d3d3" : '#d3d3d3', bottom: 8 }}>{date ? formatDate(date) : "02/4/2023"}</Text>

                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ justifyContent: 'center', height: 50, width: responsiveWidth(41), alignSelf: 'center', marginTop: responsiveHeight(0.5), borderRadius: 30, backgroundColor: 'rgba(51, 51, 51, 0.5)', marginLeft: 10 }}>
                                            <TouchableOpacity onPress={toggleTimePicker}>

                                                {/* <Text style={{ color: '#d3d3d3', marginLeft: 30 }}>{selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text> */}
                                                <Text style={{ color: '#d3d3d3', marginLeft: 30 }}>{formatTime(selectedTime)}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {timePickerVisible && (
                                            <DateTimePicker
                                                value={selectedTime}
                                                mode="time"
                                                is24Hour={false}
                                                display="spinner"
                                                onChange={(event, time) => {
                                                    if (event.type === 'set') {
                                                        setSelectedTime(time || selectedTime); // Update selected time
                                                        setTime(time);
                                                    }
                                                    setTimePickerVisible(false);
                                                }}
                                            />
                                        )}

                                    </View>

                                    <Text style={styles.guest}>No. of guests</Text>

                                    <View style={{ marginBottom: 30, height: 250 }}>
                                        <FlatList
                                            data={userGender}
                                            renderItem={renderItem}
                                            scrollEnabled={false}
                                        />
                                    </View>

                                    <Image source={require('./../../assets/icon/line.png')}
                                        style={{ height: 1.5, width: responsiveWidth(80), marginTop: 20, alignSelf: 'center' }} />

                                    <Text style={{ color: '#C70FF7', marginLeft: 20, marginTop: 20, fontSize: responsiveFontSize(2.4), fontWeight: '500' }}>₹{calculateTotalAmount()}</Text>
                                    <Text style={{ color: '#808080', marginLeft: 20, fontSize: responsiveFontSize(1.8), }}>Total Amount</Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            const totalMaleAmount = calculateMaleAmount();
                                            const totalFemaleAmount = calculateFemaleAmount();
                                            const totalCoupleAmount = calculateCoupleAmount();
                                            const totalAmount = calculateTotalAmount();


                                            SharedPreferences.setItem("date", date.toString())
                                            SharedPreferences.setItem("time", time.toString())
                                            SharedPreferences.setItem("maleAmount", maleAmount.toString())
                                            SharedPreferences.setItem("femaleAmount", femaleAmount.toString())
                                            SharedPreferences.setItem("coupleAmount", coupleAmount.toString())
                                            SharedPreferences.setItem("calculateTotalAmount", maleAmount.toString())
                                            SharedPreferences.setItem("maleQuantity", quantity['Male'].toString());
                                            SharedPreferences.setItem("femaleQuantity", quantity['Female'].toString());
                                            SharedPreferences.setItem("coupleQuantity", quantity['Couple'].toString());
                                            SharedPreferences.setItem("totalMaleAmount", totalMaleAmount.toString());
                                            SharedPreferences.setItem("totalFemaleAmount", totalFemaleAmount.toString());
                                            SharedPreferences.setItem("totalCoupleAmount", totalCoupleAmount.toString());
                                            SharedPreferences.setItem("totalAmount", totalAmount.toString());

                                            console.log("totalCoupleAmount=", totalCoupleAmount);
                                            console.log("totalFemaleAmount=", totalFemaleAmount);
                                            console.log("totalMaleAmount=", totalMaleAmount);
                                            console.log("Time=", time);
                                            console.log("Date=", date);
                                            console.log("maleAmount=", maleAmount);
                                            console.log("calculateTotalAmount=", maleAmount);
                                            console.log("Quantities saved successfully:", quantity);

                                            // navigation.navigate('ReserveScreen', { quantity: selectedQuantity });
                                            navigation.navigate('reservescreen', { quantity });
                                            console.log("Quantity", quantity)
                                        }}
                                        style={{ height: 51, width: 210, backgroundColor: '#808080', alignSelf: 'flex-end', justifyContent: 'center', borderRadius: 30, bottom: 45, marginRight: 15 }}>
                                        <LinearGradient
                                            colors={['#9A0FDE', '#480FB0']} // Replace these colors with your desired gradient
                                            start={{ x: 0, y: 0 }} // Gradient start point
                                            end={{ x: 1, y: 0 }} // Gradient end point
                                            style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 30,
                                            }}>
                                            <Text style={{ alignSelf: 'center', color: '#FFFFFF' }}>Book now</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        <View style={{ marginTop: 20, }}>
                            <FlatList
                                ref={ref}
                                data={venueTimings}
                                scrollEnabled={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View>
                                            <View style={styles.week}>
                                                <Text style={styles.weekText}>{item.day}</Text>
                                                <Text style={styles.timeText}>{item.startTime} to {item.endTime}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <View style={{ marginLeft: 14, marginRight: 14 }}>
                            <FlatList
                                ref={ref}
                                data={events}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        // <TouchableOpacity onPress={() => handleEventPress(item)}>
                                        <View style={{ borderRadius: 16, marginLeft: 4, borderWidth: 1, borderColor: '#5638AC', width: responsiveWidth(44), marginTop: 6, marginRight: 4, height: 170 }}>

                                            {item.image ? (
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        height: responsiveHeight(4),
                                                        width: responsiveHeight(8),
                                                        alignSelf: 'center',
                                                        marginTop: 22,
                                                        borderWidth: 1,
                                                        borderColor: '#5638AC',
                                                        borderRadius: 8,
                                                    }}
                                                />
                                            ) : (
                                                <Image
                                                    source={require('./../../assets/icon/bar3.png')}
                                                    style={{
                                                        height: responsiveHeight(4),
                                                        width: responsiveHeight(8),
                                                        alignSelf: 'center',
                                                        marginTop: 22,
                                                        borderWidth: 1,
                                                        borderColor: '#5638AC',
                                                        borderRadius: 8
                                                    }}
                                                />
                                            )}

                                            <Text style={{
                                                color: '#C70FF7',
                                                fontSize: responsiveFontSize(1.9),
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                marginTop: 12
                                            }}>
                                                {item.name}
                                            </Text>

                                            <Text style={{
                                                color: '#d3d3d3',
                                                fontSize: responsiveFontSize(1.5),
                                                fontWeight: '400',
                                                marginTop: 4,
                                                textAlign: 'center',
                                            }}>
                                                {item.date}
                                            </Text>

                                            <Text style={{
                                                color: '#d3d3d3',
                                                fontSize: responsiveFontSize(1.6),
                                                fontWeight: '500',
                                                textAlign: 'center',
                                                marginBottom: responsiveHeight(3)
                                            }}>
                                                {item.startTime} - {item.endTime}
                                            </Text>
                                        </View>
                                        // </TouchableOpacity>
                                    )
                                }}
                            />

                        </View>

                        {profilePictures.length === 0 ? (
                            <Image source={require('./../../assets/icon/no-data.png')}
                                style={{ height: 140, width: 140, alignSelf: 'center', marginTop: responsiveHeight(1) }} />
                        ) : (
                            <View style={{ marginLeft: 14, marginRight: 14, marginBottom: 20 }}>
                                <Text style={styles.moreText}>More Photos from the venue</Text>
                                <FlatList
                                    ref={ref}
                                    data={profilePictures}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    onScroll={e => {
                                        const x = e.nativeEvent.contentOffset.x;
                                        setCurrentIndex((x / responsiveWidth(100)).toFixed(0));
                                    }}
                                    renderItem={({ item, index }) => {
                                        if (!item) {
                                            return null; // or you can render a placeholder image or any fallback content
                                        }
                                        return (
                                            <View style={{ marginLeft: 10 }}>
                                                <Image
                                                    source={{ uri: item }}
                                                    style={{
                                                        height: 160,
                                                        width: 160,
                                                        alignSelf: 'center',
                                                        borderRadius: 20,
                                                        marginTop: 6
                                                    }}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        )}


                        <View style={{ bottom: 60 }}>
                            {artists?.length > 0 && (
                                <Text style={styles.performing}>Artists performing today</Text>
                            )}
                            <FlatList
                                ref={ref}
                                data={artists || []}  // Default to an empty array if artists is undefined
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                onScroll={e => {
                                    const x = e.nativeEvent.contentOffset.x;
                                    setCurrentIndex((x / responsiveWidth(100)).toFixed(0));
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ alignItems: artists.length === 1 ? 'center' : 'flex-start' }}>
                                            <View style={styles.Artist}>
                                                <TouchableOpacity onPress={() => navigation.navigate('Artist')}>
                                                    <Image source={{ uri: item.artistProfilePicture }}
                                                        style={{
                                                            height: 55, width: 55, alignSelf: 'center', borderRadius: 30
                                                        }} />
                                                </TouchableOpacity>

                                                <View style={styles.perform}>
                                                    <Text style={styles.Dsouza}>{item.artistFirstName} {item.artistLastName}</Text>
                                                </View>

                                                <View style={styles.perform2}>
                                                    <Text style={styles.Dsouza2}>{item.startTime}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>


                    </ScrollView>
                </ImageBackground>
            )}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    clubText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
        marginTop: responsiveHeight(23)
    },
    location: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 40
    },
    Hritik: {
        color: '#E16DFF',
        fontSize: responsiveFontSize(1.7),
        marginLeft: 5,
        fontWeight: '500',
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center'
    },
    discription: {
        color: '#fff',
        textAlign: 'center',
        marginLeft: 40,
        marginRight: 40,
        fontSize: responsiveFontSize(1.4),
        marginTop: 10
    },
    bookButton: {
        height: 55,
        width: responsiveWidth(90),
        borderWidth: 3,
        borderColor: 'rgba(51, 51, 51, 0.5)',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 10
    },
    need: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: responsiveFontSize(1.8)
    },
    book: {
        color: '#C70FF7',
        alignSelf: 'center',
        fontSize: responsiveFontSize(1.8)
    },
    week: {
        height: 40,
        width: responsiveWidth(90),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        justifyContent: 'space-between',
        borderRadius: 12,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 5,
    },
    weekText: {
        color: '#808080',
        marginLeft: 20,
        marginTop: 10,
        fontSize: responsiveFontSize(1.6)
    },
    timeText: {
        color: '#fff',
        marginRight: 20,
        marginTop: 10,
        fontSize: responsiveFontSize(1.6)
    },
    moreText: {
        color: '#C70FF7',
        marginLeft: 20,
        marginTop: responsiveHeight(2),
        fontSize: responsiveFontSize(1.8),
    },
    venue: {
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
    },
    performing: {
        marginTop: responsiveHeight(3),
        alignSelf: 'center',
        color: '#808080',
        fontSize: responsiveFontSize(1.9),
        fontWeight: '500'
    },
    Artist: {
        marginTop: 20,
        color: '#fff',
        fontWeight: '500',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    perform: {
        marginTop: 10,
        alignSelf: 'center'
    },
    Dsouza: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 11
    },
    perform2: {
        marginBottom: 20
    },
    Dsouza2: {
        color: '#808080',
        fontSize: responsiveFontSize(1.3),
        textAlign: 'center'
    },
    toggle: {
        height: 530,
        width: responsiveWidth(90),
        backgroundColor: 'rgba(51, 51, 51, 0.5)',
        alignSelf: 'center',
        borderRadius: 16,
        marginBottom: 30,
        marginTop: 10
    },
    reserve: {
        color: '#C70FF7',
        alignSelf: 'center',
        marginTop: 20
    },
    dateView: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20
    },
    date: {
        color: '#C70FF7'
    },
    time: {
        color: '#C70FF7',
        marginLeft: responsiveWidth(30)
    },
    calenderView: {
        flexDirection: 'row'
    },
    guest: {
        color: '#C70FF7',
        marginTop: 10,
        alignSelf: 'center',
        fontSize: responsiveFontSize(1.9),
        fontWeight: '500'
    },
    femaleStage: {
        height: 55,
        width: responsiveWidth(84),
        borderColor: 'rgba(51, 51, 51, 0.5)',
        borderWidth: 3,
        marginTop: 10,
        borderRadius: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20

    },
    femaleStageText: {
        color: '#808080',
        marginTop: 3,
        marginLeft: 20,
        fontSize: responsiveFontSize(1.5),
        marginBottom: 8,
        fontWeight: '500'
    }
});

//make this component available to the app
export default ClubBooking;
