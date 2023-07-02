import { alpha, styled } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      //padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: '100%',
      //transition: theme.transitions.create('width'),
      //width: '100%',
    //   [theme.breakpoints.up('sm')]: {
    //     width: '12ch',
    //     '&:focus': {
    //       width: '20ch',
    //     },
    //   },
    },
  }));

interface SearchbarProps {
  filterChat: string;
  filterChatUpdate: (v:string)=> void;
}

const Searchbar: React.FC<SearchbarProps> = ({filterChat, filterChatUpdate  }) => {
    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    fullWidth
                    value={filterChat}
                    onChange={e => filterChatUpdate(e.target.value )}
                    placeholder="Search…"
                    //inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </>
    );
};

export default Searchbar;
