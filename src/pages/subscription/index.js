import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
import { sha256 } from 'utils/other';

const Subscription = ({ course = {} }) => {
  const { type, id } = useParams();
  const { user } = useAuth();
  const [price, setPrice] = React.useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (window.pay) {
  //     window.pay(e.target);
  //   } else {
  //     console.error('Tinkoff pay function not found.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const OrderId = Math.floor(Math.random() * 1000000);
    setPrice((prev) => prev * 100);
    const data = [
      {
        Amount: price,
        Description: 'Подарочная карта на 1000 рублей',
        //NotificationURL: 'http://localhost:3000/subscription/success',
        OrderId,
        Password: '#PL847qGNuGS1N#O',
        SuccessURL: 'https://holiwell.ru/subscription/success',
        TerminalKey: '1727067060062DEMO',
        // Password: '10msy$oSiBTn^%4&',
        // TerminalKey: 1727067060116,
      },
    ];
    const Token = await sha256(
      Object.entries(data[0])
        .map(([key, value]) => value)
        .join(''),
    );

    const response = await axios.post('https://rest-api-test.tinkoff.ru/v2/Init', {
      TerminalKey: '1727067060062DEMO',
      Amount: price,
      OrderId,
      Description: 'Подарочная карта на 1000 рублей',
      SuccessURL: 'https://holiwell.ru/subscription/success',
      //NotificationURL: 'http://localhost:3000/subscription/success',
      DATA: {
        Phone: '+71234567890',
        Email: user?.email,
      },
      Receipt: {
        Email: user?.email,
        Phone: '+79031234567',
        Taxation: 'osn',
        FfdVersion: '1.05',
        Items: [
          {
            Name: course?.title,
            Price: price,
            Quantity: 1.0,
            Amount: price,
            Tax: 'vat10',
            PaymentMethod: 'full_prepayment',
            PaymentObject: 'service',
            MeasurementUnit: 'шт',
          },
        ],
      },
      Token,
    });
    if (response.data?.Success) {
      window.location.href = response.data.PaymentURL;
    }
  };

  React.useEffect(() => {
    if (course?.id) {
      setPrice(course?.price_cource * 100);
    } else {
      setPrice(9000);
    }
  }, [course]);

  if (!price) return <Loader />;

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
            Оформление подписки
          </Typography>
          <Typography variant="h1" component="h1" textTransform="uppercase">
            {`${type === 'training' ? 'Получите безлимитный доступ к тренировкам' : 'Получите безлимитный доступ медитациям'}`}
          </Typography>
          <Divider />
          {id ? (
            <>
              <FormControl>
                <RadioGroup
                  name="radio-buttons-group"
                  defaultValue={price || course?.price_cource}
                  required
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                >
                  <FormControlLabel
                    value={course?.price_cource}
                    control={<Radio />}
                    label={course?.price_cource + ' ₽'}
                  />
                </RadioGroup>
              </FormControl>
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
            Нажимая на кнопку “оплатить подписку” вы соглашаетесь с{' '}
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
              to="/offer"
              variant="body2"
              fontWeight="300"
              style={{ textDecoration: 'none', opacity: 0.7 }}
              color="primary.main"
            >
              публичной офертой
            </Typography>
          </Typography>

          <Button variant="contained" type="submit">
            {id ? 'Оплатить' : 'Оформить подписку'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Subscription;
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
