import React from 'react';

import { Box, Typography, Container, List, ListItem } from '@mui/material';

const Page = ({ details }) => {
  return (
    <Container maxWidth="lg">
      <Box width="100%" py={7} display="flex" flexDirection="column" gap={4}>
        <Typography variant="h1" textTransform="uppercase" pl={{ md: '400px' }} pr={2}>
          {details.title}
        </Typography>
        {details.punkts.map((punkt, i) => (
          <Box key={i} display="grid" gridTemplateColumns={{ xs: '1fr', md: '400px 1fr' }}>
            <Typography variant="h5">
              {i + 1}. {punkt.title}
            </Typography>
            <Box width="100%" display="flex" flexDirection="column" gap={1}>
              {punkt.punkts.map((subpunkt, j) => (
                <Box key={j} pl={3}>
                  <Typography variant="subtitle1">
                    {i + 1}.{j + 1}. {subpunkt.title}
                  </Typography>
                  {subpunkt.minipunkts && (
                    <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 3 }}>
                      {subpunkt.minipunkts.map((minipunkt, k) => (
                        <ListItem key={k} disablePadding>
                          <Typography variant="subtitle1">- {minipunkt}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Page;
