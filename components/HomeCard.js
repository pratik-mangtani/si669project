import { View, Text, Image,StyleSheet } from 'react-native'
import { Card, Button, Icon } from '@rneui/themed';


function HomeCard(props) {

    const { item } = props;
    console.log(item,"CARD");
   

    return (
        <View>
           
            <Card>
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider />
                <Card.Image source={item.imgURL} />
                <Text style={{ marginBottom: 10 }}>
                    {item.description}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    {item.price}
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='VIEW NOW' /> 
            </Card>
        </View>
    
    );

}



export default HomeCard;