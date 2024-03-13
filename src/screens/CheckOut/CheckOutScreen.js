import React, { useState, useEffect, useMemo } from 'react';
import {
  Text, TextInput, StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { CartTabStyle } from '../../styles';
import {
  Button,
  ConfirmationAlert,
  CheckOutFlatFun,
  Spacing,
  VectoreIcons,
  Input,
  AppHeader,
} from '../../components';
import { RouteName } from '../../routes';
import { useSelector, useDispatch } from 'react-redux';
import { price_symbol_action } from '../../redux/action/CommonAction';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { SH, SF, Colors, checkoutItemData } from '../../utils';
import images from '../../index';

const CheckOutScreen = props => {
  const { cartData: cartDataInfo } = useSelector(state => state.cartInfo);
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const CartTabStyles = useMemo(() => CartTabStyle(Colors), [Colors]);
  const { doctoreDetaile } = useSelector(state => state.doctorDataReducer) || {
    doctoreDetaile,
  };
  const { pricesymboldata } = useSelector(state => state.commonReducer) || {};
  const [alertVisibleUpdate, setAlertVisibleUpdate] = useState(false);
  const [alertMessageUpdate, setAlertMessageUpdate] = useState('');
  const [count, setCount] = useState(1);
  const [Applycoupon, setApplycoupon] = useState(0);
  const [value, onChangeText] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  //input user data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [contact, setContact] = useState('');


  const dispatch = useDispatch();
  let PriceSymbol = '£';

  useEffect(() => {
    dispatch(price_symbol_action(PriceSymbol));
  }, []);

  useEffect(() => {
    let total = Number(0);
    setTotalAmount(0);
    if (cartDataInfo) {
      cartDataInfo.forEach(data => {
        total =
          Number(total) + Number(data.price.split(' – ')[0].replace('£', ''));
      });
    }
    setTotalAmount(total);
  }, [cartDataInfo]);

  let alertdataUpdate = {
    updateAlet: t('Apply_Successfully_Label'),
  };
  const profileUpdate = () => {
    navigation.navigate(RouteName.CHECK_OUT);
  };


  const handleContactChange = text => {
    // Allow only numbers in contact field
    if (/^\d+$/.test(text) || text === '') {
      setContact(text);
    }
  };

  const handleEmailChange = text => {
    // Validate email format
    setEmail(text);
  };

  const handleSubmit = () => {
    // Perform form submission/validation here
    if (!name || !email || !address || !city || !postCode || !contact) {
      Alert.alert('Please fill in all fields');
      return;
    }
  };


  return (
    <View
      style={[CartTabStyles.minstyleviewphotograpgy, CartTabStyles.bgcolorset]}>
      <Spacing />
      <Text>
        {'\n'}
      </Text>
      <AppHeader
        Iconname={true}
        headerTitle={t('Checkout_Label')}
        onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={CartTabStyles.contentContainerStyle}>
        <KeyboardAvoidingView enabled>
          <View
            style={[CartTabStyles.minflexview, CartTabStyles.checkoutboxwrap]}>
            <View style={CartTabStyles.minviewsigninscreen}>
              <View style={CartTabStyles.setwhitebox}>
                <View style={CartTabStyles.flexsetviewwhitebox}>
                  <View style={CartTabStyles.twoflexview}>
                    <View style={CartTabStyles.settextflexview}>
                      <Text style={CartTabStyles.yourordertextset}>
                        {t('Order_Label')}
                      </Text>
                    </View>
                    <View style={CartTabStyles.flexicondighit}>
                      <Text>
                        <VectoreIcons
                          icon="Feather"
                          name="shopping-bag"
                          size={SF(20)}
                          color={Colors.black_text_colorss}
                        />
                      </Text>
                      <Text style={CartTabStyles.twodigitset}>
                        {cartDataInfo ? cartDataInfo?.length : 0}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* <View style={CartTabStyles.bgcolorhomeaddresh}>
                  <View style={CartTabStyles.minflehomeandedit}>
                    <View style={CartTabStyles.flexhomeaddresh}>
                      <View>
                        <VectoreIcons
                          icon="Ionicons"
                          name="md-home-outline"
                          size={SF(27)}
                          color={Colors.white_text_color}
                        />
                      </View>
                      <View>
                        <Text style={CartTabStyles.satyanilayam}>
                          {t('Satya_Nilayam_Label')}
                        </Text>
                        <Text style={CartTabStyles.homeaddress_text_color}>
                          {t('ConfirmLocation_Label')}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(RouteName.EDIT_LOCATION_SCREEN)
                      }>
                      <VectoreIcons
                        icon="Feather"
                        name="edit"
                        size={SF(25)}
                        color={Colors.white_text_color}
                      />
                    </TouchableOpacity>
                  </View>
                </View> */}

                {/* My code to add username details: */}
                <View style={{ marginVertical: 10 }} />
                <View >
                  <Input
                    placeholder={'Enter Name:'}
                    onChangeText={text => setName(text)}
                    value={name}
                  />
                  <View style={{ marginVertical: 10 }} />
                  <Input
                    placeholder={'Enter Email:'}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <View style={{ marginVertical: 10 }} />
                  <Input
                    placeholder={'Enter Address:'}
                    onChangeText={text => setAddress(text)}
                    value={address}
                  />
                  <View style={{ marginVertical: 10 }} />
                  <Input
                    placeholder={'Enter City/Town:'}
                    onChangeText={text => setCity(text)}
                    value={city}
                  /><View style={{ marginVertical: 10 }} />
                  <Input
                    placeholder={'Enter Postcode:'}
                    onChangeText={text => setPostCode(text)}
                    value={postCode}
                  />
                  <View style={{ marginVertical: 10 }} />
                  <Input
                    placeholder={'Enter Contact number:'}
                    onChangeText={text => setContact(text)}
                    value={contact}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ marginVertical: 10 }} />
                <View style={CartTabStyles.containerStyle}>
                  <Input
                    placeholder={'Enter email:'}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    containerStyle={CartTabStyles.inputContainerStyle}
                    inputContainerStyle={[
                      CartTabStyles.inputInContainerStyle
                    ]}
                  />
                </View>
                <View style={{ marginVertical: 10 }} />
                <View style={CartTabStyles.containerStyle}>
                  <Input
                    placeholder={'Enter address:'}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    containerStyle={CartTabStyles.inputContainerStyle}
                    inputContainerStyle={[
                      CartTabStyles.inputInContainerStyle
                    ]}
                  />
                </View>



                <Spacing space={SH(20)} />
                <View style={CartTabStyles.padH20}>
                  {cartDataInfo && (
                    <FlatList
                      data={cartDataInfo}
                      renderItem={({ item, index }) => (
                        <CheckOutFlatFun
                          item={item}
                          onPress={() =>
                            navigation.navigate(
                              RouteName.PRODUCT_DETAILS_SCREEN,
                            )
                          }
                          Applycoupon={Applycoupon}
                          pricesymboldata={pricesymboldata}
                          count={count}
                        />
                      )}
                    />
                  )}
                  <Spacing space={SH(20)} />
                  <View style={CartTabStyles.textinputandbuttonflex}>
                    <View style={CartTabStyles.containerStyle}>
                      <Input
                        placeholder={t('Enter_Promo_Code_Label')}
                        keyboardType={'number-pad'}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        containerStyle={CartTabStyles.inputContainerStyle}
                        inputContainerStyle={
                          CartTabStyles.inputInContainerStyle
                        }
                      />
                    </View>
                    <View style={CartTabStyles.setbutttonview}>
                      <Button
                        onPress={() => {
                          setAlertVisibleUpdate(true);
                          setAlertMessageUpdate(alertdataUpdate.updateAlet);
                          setApplycoupon(1);
                        }}
                        buttonTextStyle={CartTabStyles.textstyle}
                        title={t('Apply_Label')}
                      />
                    </View>
                  </View>
                  <Spacing space={SH(20)} />
                  <View style={CartTabStyles.setviewlistbill}>
                    {Applycoupon === 0 ? (
                      <View style={CartTabStyles.flexrowspacebeetveen}>
                        <Text style={CartTabStyles.subtotaltext}>
                          {t('Subtotal_Label')}
                        </Text>
                        <Text style={CartTabStyles.digitaltext}>
                          {pricesymboldata} {totalAmount.toFixed(2)}
                        </Text>
                      </View>
                    ) : (
                      <View style={CartTabStyles.flexrowspacebeetveen}>
                        <Text style={CartTabStyles.subtotaltext}>
                          {t('Subtotal_Label')}
                        </Text>
                        <Text style={CartTabStyles.digitaltext}>
                          {pricesymboldata} {totalAmount.toFixed(2)}
                        </Text>
                      </View>
                    )}
                    {Applycoupon === 0 ? (
                      <View style={CartTabStyles.flexrowspacebeetveen}>
                        <Text style={CartTabStyles.subtotaltext}>
                          {t('Delivery_Label')}
                        </Text>
                        <Text style={CartTabStyles.digitaltext}>
                          {pricesymboldata} 45
                        </Text>
                      </View>
                    ) : (
                      <View style={CartTabStyles.flexrowspacebeetveen}>
                        <Text style={CartTabStyles.subtotaltext}>
                          {t('Delivery_Label')}
                        </Text>
                        <Text style={CartTabStyles.digitaltext}>
                          {pricesymboldata} 35
                        </Text>
                      </View>
                    )}
                    {Applycoupon === 0 ? (
                      <View style={CartTabStyles.flexrowspacebeetveen}>
                        <Text style={CartTabStyles.digitaltextsettwo}>
                          {t('Total_Label')}
                        </Text>
                        <Text style={CartTabStyles.digitaltextsettwo}>
                          {pricesymboldata}{' '}
                          {Number(totalAmount.toFixed(2) + 45).toFixed(2)}
                        </Text>
                      </View>
                    ) : (
                      <View style={CartTabStyles.flexrowspacebeetveen}>
                        <Text style={CartTabStyles.digitaltextsettwo}>
                          {t('Total_Label')}
                        </Text>
                        <Text style={CartTabStyles.digitaltextsettwo}>
                          {pricesymboldata}{' '}
                          {Number(totalAmount.toFixed(2) + 45).toFixed(2)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View
        style={[
          CartTabStyles.positionabsolutesetbutton,
          CartTabStyles.bgcolorset,
        ]}>
        <View style={CartTabStyles.accountbutton}>
          {Applycoupon === 0 ? (
            <View style={CartTabStyles.textcenyet}>
              <View>
                <Text style={CartTabStyles.digitaltextsettwo}>
                  {pricesymboldata}{' '}
                  {Number(totalAmount.toFixed(2) + 45).toFixed(2)}
                </Text>
                <Text style={CartTabStyles.viewdetailesbilltext}>
                  {t('View_Detailed_Bill_Label')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={CartTabStyles.textcenyet}>
              <View>
                <Text style={CartTabStyles.digitaltextsettwo}>
                  {pricesymboldata}{' '}
                  {Number(totalAmount.toFixed(2) + 45).toFixed(2)}
                </Text>
                <Text style={CartTabStyles.viewdetailesbilltext}>
                  {t('View_Detailed_Bill_Label')}
                </Text>
              </View>
            </View>
          )}
          <View style={CartTabStyles.setbuttonwidthview}>
            <Button
              title={t('Proceed_Pay_Label')}
              onPress={() => navigation.navigate(RouteName.PAYMENT_SCREEN)}
            />
          </View>
        </View>
      </View>

      <ConfirmationAlert
        message={alertMessageUpdate}
        modalVisible={alertVisibleUpdate}
        setModalVisible={setAlertVisibleUpdate}
        onPressCancel={() => setAlertVisibleUpdate(!alertVisibleUpdate)}
        onPress={() => {
          setAlertVisibleUpdate(!alertVisibleUpdate), profileUpdate();
        }}
        buttonText={t('Ok')}
        animationIcon={true}
        source={images.loginsuccessful}
        Lottiewidthstyle={CartTabStyles.successtyle}
        buttonminview={CartTabStyles.centerBtn}
      />
    </View>
  );
};


export default CheckOutScreen;
