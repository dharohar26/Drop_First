import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, FlatList } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

// CustomDropdown component
const CustomDropdown = ({ data, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
                <Text style={{ color: selectedValue ? '#fff' : '#d3d3d3', marginLeft: 20 }}>{selectedValue ? selectedValue.artistFirstName + ' ' + selectedValue.artistLastName : 'Select Item'}</Text>
            </TouchableOpacity>

            <Modal visible={isOpen} transparent={true} animationType='fade'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',top:40,borderRadius: 10  }}>
                    <View style={{ backgroundColor: '#383838',height: 200, width: responsiveWidth(76), borderRadius: 10 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ height: 34,  width: responsiveWidth(76),borderWidth:1,borderColor:'#808080',alignSelf:'center',justifyContent:'center',borderRadius: 10,marginTop:5 }} onPress={() => { onSelect(item); setIsOpen(false); }}>
                                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.8),marginLeft:20}}>{item.artistFirstName} {item.artistLastName}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.artistId.toString()}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CustomDropdown;
