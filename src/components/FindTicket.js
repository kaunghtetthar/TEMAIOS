import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card, Button, CardSection, Spinner, CardScroll, Input} from './common';
import { Dropdown } from 'react-native-material-dropdown';

export default class FindTicket extends Component {
    constructor() {
        super();
        this.state = { license_plate: null, plate_province: null, limit:null, isLoading: false,
            error: '',
            data : [
                { value : 'กรุงเทพมหานคร',},
                { value: 'สมุทรปราการ',},
                {value:'นนทบุรี',},
                {value:'ปทุมธานี',},
                {value:'พระนครศรีอยุธยา'},
                {value:'อ่างทอง'},
                {value:'ลพบุรี'},
                {value:'สิงห์บุรี'},
                {value:'ชัยนาท'},
                {value:'สระบุรี'},
                {value:'ชลบุรี'},
                {value:'ระยอง'},
                {value:'จันทบุรี'},
                {value:'ตราด'},
                {value:'ฉะเชิงเทรา'},
                {value:'ปราจีนบุรี'},
                {value:'นครนายก'},
                {value:'สระแก้ว'},
                {value:'นครราชสีมา'},
                {value:'บุรีรัมย์'},
                {value:'สุรินทร์'},
                {value:'ศรีสะเกษ'},
                {value:'อุบลราชธานี'},
                {value:'ยโสธร'},
                {value:'ชัยภูมิ'},
                {value:'อำนาจเจริญ'},
                {value:'บึงกาฬ'},
                {value:'หนองบัวลำภู'},
                {value:'ขอนแก่น'},
                {value:'อุดรธานี'},
                {value:'เลย',},
                {value:'หนองคาย'},
                {value:'มหาสารคาม'},
                {value:'ร้อยเอ็ด'},
                {value:'กาฬสินธุ์'},
                {value:'สกลนคร'},
                {value:'นครพนม'},
                {value:'มุกดาหาร'},
                {value:'เชียงใหม่',},
                {value:'ลำพูน'},
                {value:'ลำปาง'},
                {value:'อุตรดิตถ์'},
                {value:'แพร่'},
                {value:'น่าน'},
                {value:'พะเยา'},
                {value:'เชียงราย'},
                {value:'แม่ฮ่องสอน'},
                {value:'นครสวรรค์'},
                {value:'อุทัยธานี'},
                {value:'กำแพงเพชร'},
                {value:'ตาก'},
                {value:'สุโขทัย'},
                {value:'พิษณุโลก'},
                {value:'พิจิตร'},
                {value:'เพชรบูรณ์'},
                {value:'ราชบุรี'},
                {value:'กาญจนบุรี'},
                {value:'สุพรรณบุรี'},
                {value:'นครปฐม',},
                {value:'สมุทรสาคร'},
                {value:'สมุทรสงคราม'},
                {value:'เพชรบุรี'},
                {value:'ประจวบคีรีขันธ์'},
                {value:'นครศรีธรรมราช'},
                {value:'กระบี่',},
                {value:'พังงา'},
                {value:'ภูเก็ต'},
                {value:'สุราษฎร์ธานี'},
                {value:'ระนอง'},
                {value:'ชุมพร'},
                {value:'สงขลา'},
                {value:'สตูล'},
                {value:'ตรัง'},
                {value:'พัทลุง'},
                {value:'ปัตตานี'},
                {value:'ยะลา'},
                {value:'นราธิวาส'},
{value:'เบตง'},
            ]};


    }




    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.Text}</Text>
                <Card>


                    <CardSection>
                        <Input
                            placeholder="...."
                            label="License Plate"
                            value={this.state.license_plate}
                            onChangeText={license_plate => this.setState({ license_plate })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            placeholder="...."
                            label="Plate Province"
                            value={this.state.plate_province}
                            onChangeText={plate_province => this.setState({ plate_province })}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            placeholder="...."
                            label="Limit"
                            value={this.state.id}
                            onChangeText={limit => this.setState({ limit })}
                        />
                    </CardSection>


                    <Dropdown
                      label='Plate Province'
                      data={this.state.data}
                      onChangeText={plate_province => this.setState({ plate_province })}
                      />


                    <CardSection>
                        <Button onPress={() => Actions.Ticketlist({
                            license_plate: this.state.license_plate,
                            plate_province: this.state.plate_province,
                            limit: this.state.limit,

                        } )}>
                    Search
                        </Button>
                    </CardSection>

                    <Text style={StyleSheet.errorTextStyle}>
                        {this.state.error}
                    </Text>

                </Card>


            </View>
        );
    }
}

// <CardSection>
//     <Input
//         placeholder="...."
//         label="Plate Province"
//         value={this.state.plate_province}
//         onChangeText={plate_province => this.setState({ plate_province })}
//     />
// </CardSection>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
});
