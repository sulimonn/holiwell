import React from 'react';
import { useParams, Link } from 'react-router-dom';

import './style.css';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
import Loader from 'components/Loader';

const SubscriptionForm = ({ course = {} }) => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const [price, setPrice] = React.useState(null);
  const OrderId = Math.floor(Math.random() * 1000000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const TPF = e.target;

    const { description, amount, email, phone, receipt } = TPF;

    if (receipt) {
      if (!email.value && !phone.value) return alert('Поле E-mail или Phone не должно быть пустым');

      TPF.receipt.value = JSON.stringify({
        EmailCompany: 'holiwell.superuser@gmail.com',
        Company: 'Holiwell',
        Taxation: 'patent',
        FfdVersion: '1.05',
        Items: [
          {
            Name: description.value || 'Оплата',
            Price: amount.value * 100,
            Quantity: 1.0,
            Amount: amount.value * 100,
            PaymentMethod: 'full_prepayment',
            PaymentObject: 'service',
            Tax: 'none',
            MeasurementUnit: 'pc',
          },
        ],
      });
    }

    if (window.pay) {
      window.pay(TPF);
      localStorage.setItem('order', JSON.stringify({ type, id, OrderId, user: user?.id }));
    } else {
      console.error('Tinkoff pay function not found.');
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const OrderId = Math.floor(Math.random() * 1000000);
  //   setPrice((prev) => prev * 100);
  //   const data = [
  //     {
  //       Amount: price,
  //       Description: 'Подарочная карта на 1000 рублей',
  //       //NotificationURL: 'http://localhost:3000/subscription/success',
  //       OrderId,
  //       Password: '#PL847qGNuGS1N#O',
  //       SuccessURL: 'https://holiwell.ru/subscription/success',
  //       TerminalKey: '1727067060062DEMO',
  //       // Password: '10msy$oSiBTn^%4&',
  //       // TerminalKey: 1727067060116,
  //     },
  //   ];
  //   const Token = await sha256(
  //     Object.entries(data[0])
  //       .map(([key, value]) => value)
  //       .join(''),
  //   );

  //   const response = await axios.post('/v2/Init', {
  //     TerminalKey: '1727067060062DEMO',
  //     Amount: price,
  //     OrderId,
  //     Description: 'Подарочная карта на 1000 рублей',
  //     SuccessURL: 'https://holiwell.ru/subscription/success',
  //     //NotificationURL: 'http://localhost:3000/subscription/success',
  //     DATA: {
  //       Phone: '+71234567890',
  //       Email: user?.email,
  //     },
  //     Receipt: {
  //       Email: user?.email,
  //       Phone: '+79031234567',
  //       Taxation: 'osn',
  //       FfdVersion: '1.05',
  //       Items: [
  //         {
  //           Name: course?.title,
  //           Price: price,
  //           Quantity: 1.0,
  //           Amount: price,
  //           Tax: 'vat10',
  //           PaymentMethod: 'full_prepayment',
  //           PaymentObject: 'service',
  //           MeasurementUnit: 'шт',
  //         },
  //       ],
  //     },
  //     Token,
  //   });
  //   if (response.data?.Success) {
  //     window.location.href = response.data.PaymentURL;
  //   }
  // };

  React.useEffect(() => {
    if (course?.id) {
      setPrice(course?.price_cource);
    } else {
      setPrice(9000);
    }
  }, [course]);

  console.log(course);

  if (!price) return <Loader />;
  if (!course?.id) return <Loader />;

  return (
    <Container>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width={{ xs: '100%', md: '571px' }}
        mx="auto"
        py={{ xs: 10, md: 15 }}
      >
        <Stack spacing={4} component="form" onSubmit={handleSubmit}>
          <Typography variant="body1" fontWeight="400" color="text.secondary">
            {`${type === 'training' ? 'Оформление подписки' : 'Покупка курса'}`}
          </Typography>
          <Typography variant="h1" component="h1" textTransform="uppercase">
            {`${type === 'training' ? 'Получите безлимитный доступ к тренировкам' : course?.title}`}
          </Typography>
          <Divider />
          {id ? (
            <>
              <Typography variant="h3" fontWeight="300">
                {course?.price_cource} ₽
              </Typography>
            </>
          ) : (
            <>
              <FormControl>
                <RadioGroup
                  name="radio-buttons-group"
                  defaultValue={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                >
                  <FormControlLabel
                    value={1000}
                    control={<Radio />}
                    label="1000 ₽ Ежемесячная оплата"
                  />
                  <FormControlLabel
                    value={9000}
                    control={<Radio />}
                    label="9000 ₽ Годовая оплата"
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}
          <Typography variant="body2" fontWeight="300" color="text.secondary">
            Нажимая на кнопку “Оплатить“ вы соглашаетесь с{' '}
            <Typography
              component={Link}
              to="/privacy-policy"
              variant="body2"
              fontWeight="300"
              style={{ textDecoration: 'none', opacity: 0.7 }}
              color="primary.main"
            >
              политикой конфиденциальности
            </Typography>{' '}
            приложения и подтверждаете, что ознакомились с{' '}
            <Typography
              component={Link}
              to="/terms-of-use"
              variant="body2"
              fontWeight="300"
              style={{ textDecoration: 'none', opacity: 0.7 }}
              color="primary.main"
            >
              публичной офертой
            </Typography>
          </Typography>
          <input
            className="payform-tbank-row"
            type="hidden"
            name="terminalkey"
            defaultValue="1727067060062DEMO"
          />
          <input className="payform-tbank-row" type="hidden" name="frame" defaultValue="false" />
          <input className="payform-tbank-row" type="hidden" name="language" defaultValue="ru" />
          <input className="payform-tbank-row" type="hidden" name="receip2t" defaultValue="" />
          <input
            className="payform-tbank-row"
            type="text"
            placeholder="Сумма заказа"
            name="amount"
            required
            hidden
            defaultValue={price}
          />
          <input
            className="payform-tbank-row"
            type="hidden"
            placeholder="Номер заказа"
            name="order"
            defaultValue={OrderId}
          />
          <input
            className="payform-tbank-row"
            type="text"
            placeholder="Описание заказа"
            name="description"
            hidden
            vakue={
              type === 'training'
                ? 'Получите безлимитный доступ к тренировкам'
                : 'Получите безлимитный доступ медитациям'
            }
          />
          <input
            className="payform-tbank-row"
            type="text"
            placeholder="ФИО плательщика"
            name="name"
            hidden
            defaultValue={user?.first_name + ' ' + user?.last_name}
          />
          <input
            className="payform-tbank-row"
            type="email"
            placeholder="E-mail"
            name="email"
            hidden
            defaultValue={user?.email}
          />
          <input
            className="payform-tbank-row"
            type="tel"
            placeholder="Контактный телефон"
            name="phone"
            defaultValue={user?.phone}
            hidden
          />
          <Button variant="contained" type="submit">
            {id ? 'Оплатить' : 'Оформить подписку'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SubscriptionForm;
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const data = [
//     {
//       Amount: 140000,
//       Description: 'Подарочная карта на 1000 рублей',
//       OrderId: '21090',
//       // Password: '#PL847qGNuGS1N#O',
//       // TerminalKey: '1727067060062DEMO',
//       Password: '10msy$oSiBTn^%4&',
//       TerminalKey: '1727067060116',
//     },
//   ];
//   const Token = await sha256(
//     Object.entries(data[0])
//       .map(([key, value]) => value)
//       .join(''),
//   );

//   await axios.post('/v2/Init', {
//     TerminalKey: '1727067060116',
//     Amount: 140000,
//     OrderId: '21090',
//     Description: 'Подарочная карта на 1000 рублей',
//     DATA: {
//       Phone: '+71234567890',
//       Email: 'a@test.com',
//     },
//     Receipt: {
//       Email: 'a@test.ru',
//       Phone: '+79031234567',
//       Taxation: 'osn',
//       Items: [
//         {
//           Name: 'Наименование товара 1',
//           Price: 10000,
//           Quantity: 1,
//           Amount: 10000,
//           Tax: 'vat10',
//           Ean13: '303130323930303030630333435',
//         },
//         {
//           Name: 'Наименование товара 2',
//           Price: 20000,
//           Quantity: 2,
//           Amount: 40000,
//           Tax: 'vat20',
//         },
//         {
//           Name: 'Наименование товара 3',
//           Price: 30000,
//           Quantity: 3,
//           Amount: 90000,
//           Tax: 'vat10',
//         },
//       ],
//     },
//     Token,
//   });
// };
