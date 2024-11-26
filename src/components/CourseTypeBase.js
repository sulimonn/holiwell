import React from 'react';
import { Box, Typography, Tab, Container } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import SortLessons from 'components/SortLessons';
import Back from './Back';

const Lessons = ({ title, children, sortOption, setSortOption, lessons }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ width: '100%' }}>
        <Box
          width="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: 'background.paper',
            py: 7,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={{ xs: '400', md: '500' }}
            textTransform="uppercase"
            sx={{
              fontSize: { xs: '1.25rem', md: '2.25rem' },
            }}
          >
            {title}
          </Typography>
        </Box>
        <Container
          maxWidth="lg"
          sx={{ position: { xs: 'static', md: 'relative' }, mt: { xs: 7, md: 0 } }}
        >
          <Back title={title} to="/" sx={{ display: { xs: 'block', md: 'none' } }} />
          <Box position={{ xs: 'static', md: 'relative' }} width="100%">
            {lessons && (
              <Box
                position={{ xs: 'static', md: 'absolute' }}
                sx={{ inset: 0, width: '100%', height: '100%' }}
              >
                <Box mx="auto" width="fit-content">
                  <TabList
                    onChange={handleChange}
                    sx={{
                      backgroundColor: 'primary.lighter',
                      borderRadius: 2,
                      minHeight: 0,

                      '& .MuiTabs-indicator': {
                        height: '100%',
                        backgroundColor: 'background.default',
                        zIndex: 0,
                        borderRadius: 2,
                        border: '5px solid',
                        borderColor: 'primary.lighter',
                      },
                    }}
                  >
                    <Tab
                      label="Курсы"
                      value="1"
                      sx={{
                        textTransform: 'none',
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        fontWeight: 300,
                        px: { xs: 8, sm: 13 },
                        py: { xs: 1, sm: 1.5 },
                        minHeight: 0,
                        zIndex: 1,
                      }}
                    />
                    <Tab
                      label="Уроки"
                      value="2"
                      sx={{
                        textTransform: 'none',
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        fontWeight: 300,
                        px: { xs: 8, sm: 13 },
                        py: { xs: 1, sm: 1.5 },
                        minHeight: 0,
                        zIndex: 1,
                      }}
                    />
                  </TabList>
                </Box>
              </Box>
            )}
            <Box
              display="flex"
              alignItems="flex-end"
              justifyContent="flex-start"
              py={{ xs: 0, md: 3.5 }}
              mt={{ xs: 2, md: 4 }}
              sx={{
                borderBottom: { xs: 'none', md: '1px solid' },
                borderColor: { xs: 'transparent', md: 'divider' },
              }}
            >
              <SortLessons sortOption={sortOption} setSortOption={setSortOption} />
            </Box>
          </Box>
          <Box pt={{ xs: 0, md: 2 }} pb={6}>
            {lessons ? (
              <>
                <TabPanel sx={{ p: 0 }} value="1">
                  {children}
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value="2">
                  {lessons}
                </TabPanel>
              </>
            ) : (
              children
            )}
          </Box>
        </Container>
      </Box>
    </TabContext>
  );
};

export default Lessons;
