import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, FlatList,Image,Dimensions} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// CustomDropdown component
const SecCustomDropDown = ({ data, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { width, height } = Dimensions.get('window');

    return (
        <View>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
                <Text style={{ color: selectedValue ? '#fff' : '#d3d3d3', marginLeft: 20 }}>{selectedValue ? selectedValue.name : 'Select Item'}</Text>
            </TouchableOpacity>

            <Modal visible={isOpen} transparent={true} animationType='fade'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',top:24,borderRadius: 10  }}>
                    <View style={{ backgroundColor: '#383838',height: 500, width: responsiveWidth(90), borderRadius: 10 }}>
<FlatList
            data={data}
            showsHorizontalScrollIndicator={true}
            
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center', // Align items vertically
                        height: height * 0.06, // Adjust height according to screen height
                        width: width * 0.9, // Adjust width according to screen width
                        borderWidth: 1,
                        borderColor: '#808080',
                        borderRadius: 10,
                        marginTop: 5,
                    }}
                    onPress={() => { onSelect(item); setIsOpen(false); }}
                >
                    <Image 
                        source={{ uri: item.image }}
                        style={{ 
                            height: height * 0.03, // Adjust image height according to screen height
                            width: height * 0.03, // Adjust image width according to screen height
                            borderRadius: 6,
                            marginRight: 10, // Add some space between image and 
                            marginLeft:20
                        }}
                    />
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8),textAlign:'left' }}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default SecCustomDropDown;
