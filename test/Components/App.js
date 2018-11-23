
//thieu thi thi ta chay yarn add react-native
import { View, Text, TouchableOpacity, Image, Dimensions, RefreshControl, TextInput, ListView, AsyncStorage, } from 'react-native';
import React, { Component } from 'react';
//import { Base64 } from 'js-base64';
import image from '../Components/images/1.jpg';
import Buffer1 from 'buffer'; // tren thu vien buffer
//    import RNFS  from 'react-native-fs';// npm install react-native-fs// yarn react-native// react-native link react-native-fs// https://www.npmjs.com/package/react-native-fs
import io from 'socket.io-client/dist/socket.io.js';//yarn add react-native-socket.io-client// yarn add socket.io-client
 // import sizeOf1 from 'image-size';// yarn add image-size  //yarn add buffer-image-size
import getImage from '../api/getImage';
import saveImage from '../api/saveImage';

var text = 'trungtamlaptrinhkhoapham';
var bytes = Buffer1.Buffer(text);
var jsoon = bytes.toJSON();// tu json truyen buffer roi moi chuyen toString duoc

//var bufferimage =  Buffer1.Buffer(image);
//var imgaejsoon = bufferimage.toJSON();


var imag = image;

var DATA = [
    {Ten: 'Mr.hoang', tuoi: '30'},
    {Ten: 'Mr.nhung', tuoi: '58'},
    {Ten: 'Mr.anh', tuoi: '20'},
    {Ten: 'Mr.yen', tuoi: '30'},
];
var bytes1 = Buffer1.Buffer(DATA);
//var fs = require('fs');

var e;
export default class App extends Component {
    constructor(props) {
        super(props);
        e = this;
        saveImage(imag)
        .then(res => console.log(res));
        getImage()
        .then(res => console.log(res));
        console.log(bytes1);
    
        this.socket = io('http://192.168.0.103:3000', { jsonp: false });
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            maunen: 'bue',
            dataJson: 'red',
            text: 'red',
            id: 1,
            send: '',
            refreshing: false,
            page: 1,
        };
        this.arr = [];
        this.socket.on('server-send-client', data => {
            var buffer = Buffer1.Buffer(data); //data nhan duoc la json ta chuyen ve buffer 
            var tostring = buffer.toString(); // sau chuyen buffer ve chuoi tostring
            var res = [
                {text1: tostring, send1: tostring}
            ];
            console.log(res);
            e.setState({
                id: 2,
                maunen: tostring,
                dataJson: tostring,
                text: tostring, 
                dataSource: ds.cloneWithRows(res),
                send: tostring,
                refreshing: true,
            });
            console.log('----DULIEU_TRA_VE---');
            console.log(data);
            console.log('----toString---');
            console.log(data.toString());
            console.log('----Buffer---');
            console.log(Buffer1.Buffer(data));
         //var buffer = Buffer1.Buffer(data);
            console.log(buffer.toString());

           
        });
    }



    test() {  //nhan nut test la nhay vao test
        var bytes = Buffer1.Buffer(text);
        console.log('----App-----');
        console.log(bytes);

        console.log('----App1-----');
        console.log(bytes.toJSON());
        console.log('----App2-----');
        console.log(bytes.toString());
    }

    send() {
        var text2 = this.state.send;
        var bytes2 = Buffer1.Buffer(text2);
        var dataJson = bytes2.toJSON();// tu json truyen buffer roi moi chuyen toString duoc
        //this.setState({ send: jsoon});
        this.socket.emit('client-send-color', dataJson)
    }

    taoHang(property) {
        this.arr = property;
        return(
            <View style={{ flex: 1, backgroundColor: '#40AEE5' }} >
               <Text key={property.id}>{property.tuoi}</Text>
               <Text key={property.id}>{property.Ten}</Text>
                <Text key={property.id}>{property.text1}</Text>
                <Text key={property.id}>{property.send1}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#52BB80' }}>
                <Text> Componet app</Text>
                <TouchableOpacity onPress={() => this.test()}>
                    <Text>test</Text>
                </TouchableOpacity>

                <TextInput 
                    style={{ backgroundColor: '#fff'}}
                    placeholder="nhap..."
                    value={this.state.send}
                    onChangText={text => this.setState({ send: text })}
                />

                <TextInput 
                    style={{ backgroundColor: '#fff'}}
                    placeholder="..."
                    value={this.state.text}
                    onChangText={text => this.setState({ text: text })}

                />
                <TouchableOpacity onPress={() => this.send()}>
                    <Text>send</Text>
                </TouchableOpacity>

                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.taoHang}
                    refreshControl={ 
                        <RefreshControl 
                            refreshing = {this.state.refreshing}
                            onRefresh={() => {
                                this.setState({refreshing: true});
                                const newpage = this.state.page + 1;
                                this.taoHang(property, newpage)
                                .then(() => {
                                    this.arr = property.concat(this.arr);
                                    this.setState({
                                        dataSource: ds.cloneWithRows(res),
                                        refreshing: false,
                                    })}
                                )
                                .catch( e=> console.log(e));
                            }}
                        />
                    }
                />
            </View>
        );
    }
}


/*

//thieu thi thi ta chay yarn add react-native
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput, ListView, AsyncStorage, } from 'react-native';
import React, { Component } from 'react';
//import { Base64 } from 'js-base64';
import image from '../Components/images/1.jpg';
import Buffer1 from 'buffer'; // tren thu vien buffer
//    import RNFS  from 'react-native-fs';// npm install react-native-fs// yarn react-native// react-native link react-native-fs// https://www.npmjs.com/package/react-native-fs
import io from 'socket.io-client/dist/socket.io.js';//yarn add react-native-socket.io-client// yarn add socket.io-client
 // import sizeOf1 from 'image-size';// yarn add image-size  //yarn add buffer-image-size
import getImage from '../api/getImage';
import saveImage from '../api/saveImage';

var text = 'trungtamlaptrinhkhoapham';
var bytes = Buffer1.Buffer(text);
var jsoon = bytes.toJSON();// tu json truyen buffer roi moi chuyen toString duoc

//var bufferimage =  Buffer1.Buffer(image);
//var imgaejsoon = bufferimage.toJSON();


var imag = image;

var DATA = [
    {Ten: 'Mr.hoang', tuoi: '30'},
    {Ten: 'Mr.nhung', tuoi: '58'},
    {Ten: 'Mr.anh', tuoi: '20'},
    {Ten: 'Mr.yen', tuoi: '30'},
]
//var fs = require('fs');

var e;
export default class App extends Component {

   
    constructor(props) {
        super(props);
        e = this;
        
        saveImage(imag);
        getImage()
        .then(res => console.log(res));
    
        this.socket = io('http://192.168.0.103:3000', { jsonp: false });
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            maunen: 'bue',
            dataJson: jsoon,
            text: 'red',
            id: 1,
            send: '..',
        };
        this.socket.on('server-send-client', data => {
            var buffer = Buffer1.Buffer(data); //data nhan duoc la json ta chuyen ve buffer 
            var tostring = buffer.toString(); // sau chuyen buffer ve chuoi tostring
            var res = [
                {text1: tostring}
            ];
            console.log(res);
            e.setState({
                id: 2,
                maunen: tostring,
                dataJson: tostring,
                text: tostring, 
                dataSource: ds.cloneWithRows(res),
                send: data,
            });
            console.log('----DULIEU_TRA_VE---');
            console.log(data);
            console.log('----toString---');
            console.log(data.toString());
            console.log('----Buffer---');
            console.log(Buffer1.Buffer(data));
         //var buffer = Buffer1.Buffer(data);
            console.log(buffer.toString());

           
        });
    }

/*
    componentDidMount() {
        var bytes = Buffer1.Buffer(
            text
        ); //Buffer1 la lay thu vien, con Buffer la ham Buffer. de chuyen file ve dang buffer
        console.log('----App-----');
        console.log(bytes); //log buffer hien thi ra
    
        console.log('----App1-----');
        console.log(bytes.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App2-----');
        console.log(bytes.toString()); //dua buffer ve string ve dang chuoi cua no hoan goc
    }
*/

/*
test() {  //nhan nut test la nhay vao test
    var bytes = Buffer1.Buffer(text);
    console.log('----App-----');
    console.log(bytes);

    console.log('----App1-----');
    console.log(bytes.toJSON());
    console.log('----App2-----');
    console.log(bytes.toString());
}

send() {
    this.socket.emit('client-send-color', this.state.dataJson)
}

taoHang(property) {
    return(
        <View style={{ flex: 1, backgroundColor: '#40AEE5' }} >
           <Text key={property.id}>{property.tuoi}</Text>
           <Text key={property.id}>{property.Ten}</Text>
            <Text key={property.id}>{property.text1}</Text>
            <Text key={property.id}>{property.text}</Text>
        </View>
    );
}

render() {
    return (
        <View style={{ flex: 1, backgroundColor: '#52BB80' }}>
            <Text> Componet app</Text>
            <TouchableOpacity onPress={() => this.test()}>
                <Text>test</Text>
            </TouchableOpacity>

            <TextInput 
            
                placeholder="..."
                value={() =>{
                    var text2 = this.state.send;
                    var bytes2 = Buffer1.Buffer(text2);
                    var jsoon = bytes2.toJSON();// tu json truyen buffer roi moi chuyen toString duoc
                    }
                }
                onChangText={text => this.setState({ send: text })}

            />

            <TextInput 
            
            placeholder="..."
            value={this.state.text}
            onChangText={text => this.setState({ text: text })}

        />
            <TouchableOpacity onPress={() => this.send()}>
                <Text>send</Text>
            </TouchableOpacity>

            <ListView 
                dataSource={this.state.dataSource}
                renderRow={this.taoHang}
            />
        </View>
    );
}
}

*/

    /*
    componentDidMount() {
        //DocumentDirectoryPath 
        var bytes = Buffer1.Buffer(imag); //Buffer1 la lay thu vien, con Buffer la ham Buffer. de chuyen file ve dang buffer
        var noidung = RNFS.DocumentDirectoryPath +'/1.jpg';
       // var noidung = fs.readFileSync(__dirname + "/1.jpg");
        console.log('---noidung-----');
        console.log(noidung);
       // console.log(noidung.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App-----');
        console.log(bytes); //log buffer hien thi ra
    
        console.log('----App1-----');
        console.log(bytes.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App2-----');
        console.log(bytes.toString()); //dua buffer ve string ve dang chuoi cua no hoan goc
    }
    */

    /*
    componentDidMount() {
        sizeOf1.sizeOf('../Components/images/1.jpg', function (err, dimensions) {
            console.log(dimensions.width, dimensions.height);
        });
    }
    */
    
    /*
    componentDidMount() {
        var noidung = fs.readFileSync(__dirname + "/1.jpg");
        console.log(noidung);
        console.log(noidung.toJSON());
    }
    */
 

    /*
    componentDidMount() {
        var bytes = Buffer1.Buffer(
            imag
        ); //Buffer1 la lay thu vien, con Buffer la ham Buffer. de chuyen file ve dang buffer
        console.log('----App-----');
        console.log(bytes); //log buffer hien thi ra
    
        console.log('----App1-----');
        console.log(bytes.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App2-----');
        console.log(bytes.toString()); //dua buffer ve string ve dang chuoi cua no hoan goc
    }
    */
    

    /*
    componentDidMount() {
        var pngBase64 ="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        var y = Base64.decode(pngBase64);

       console.log('------App-------');
        console.log(y);
        console.log('------App-------');
    }
    */
