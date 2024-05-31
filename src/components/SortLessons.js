import React, { useState } from 'react';
import {
  Button,
  Menu,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Divider,
} from '@mui/material';
import Icon from '@ant-design/icons';
import Sort from 'assets/images/icons/sort';
import down from 'assets/images/icons/down';
const SortLessons = ({ sortOption = 'new', setSortOption }) => {
  const [sortOptionChange, setSortOptionChange] = useState(sortOption);
  const [anchorEl, setAnchorEl] = useState(null);
  const SortIcon = (props) => <Icon component={Sort} {...props} />;
  const DownOutlined = (props) => <Icon component={down} {...props} />;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (event) => {
    setSortOptionChange(event.target.value);
  };
  const handleSortOptionSubmit = (event) => {
    setSortOption(event.target.value);
    handleClose();
  };
  return (
    <div style={{ position: 'relative', zIndex: 99 }}>
      <Button
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<SortIcon />}
        endIcon={<DownOutlined style={{ fontSize: '12px' }} />}
        sx={{
          textTransform: 'none',
          borderRadius: '50px',
          backgroundColor: Boolean(anchorEl) ? 'background.default' : 'primary.lighter',
          boxShadow: Boolean(anchorEl) ? '0px 0px 10px 0px #00000040' : 'none',
          py: { xs: 0.6, md: 1 },
          px: { xs: 2, md: 3 },
          gap: 0.5,
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          variant="h5"
          component="span"
          fontWeight="100"
          sx={{ whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}
        >
          {sortOptionChange === 'popular'
            ? 'По популярности'
            : sortOptionChange === 'new'
              ? 'Новое'
              : 'По умолчанию'}
        </Typography>
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          mt: 2,
          '& .MuiPaper-root': {
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px #00000040',
          },
          '& .MuiList-root': {
            py: 0,
          },
        }}
      >
        <Box sx={{ px: 3, py: 2, backgroundColor: 'background.default' }}>
          <RadioGroup
            aria-label="sort"
            name="sort"
            value={sortOptionChange}
            onChange={handleSortChange}
            sx={{ gap: 0.7 }}
          >
            <FormLabel
              component="legend"
              fontWeight="600"
              sx={{ fontSize: { xs: '14px', sm: '16px' } }}
            >
              СОРТИРОВКА
            </FormLabel>
            <Divider />
            <FormControlLabel
              value="popular"
              control={<Radio />}
              label={
                <Typography variant="h5" component="p" fontWeight="250">
                  По популярности
                </Typography>
              }
            />
            <Divider />
            <FormControlLabel
              value="new"
              control={<Radio fontSize="15px" />}
              label={
                <Typography variant="h5" component="p" fontWeight="250">
                  Новое
                </Typography>
              }
            />
            <Divider />
            <FormControlLabel
              value="default"
              control={<Radio />}
              label={
                <Typography variant="h5" component="p" fontWeight="250">
                  По умолчанию
                </Typography>
              }
            />
          </RadioGroup>
          <Button
            variant="contained"
            onClick={handleSortOptionSubmit}
            sx={{ mt: 2, width: '100%' }}
          >
            <Typography variant="h5" component="span" size="small">
              ПРИМЕНИТЬ
            </Typography>
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default SortLessons;
