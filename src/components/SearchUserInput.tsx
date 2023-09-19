import { Autocomplete, Avatar, Chip, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { cAPIWrapper } from '../services/HttpWrapper';
import { User } from '../types/User';
import AvatarWrapper from './AvatarWrapper';

interface SearchUserInputProps {
    
    label: string;
    placeholder: string;
    maxLimit: number
    filterSuggestionFn?: (value: User, index: number, array: User[]) => boolean
    friendOnly?: boolean;
    hideUser?: User;
    inputParams?: any;
    value: User[];
    hideFriends?: boolean;
    onChange: (newValue: User[]) => void;


}

const SearchUserInput: React.FC<SearchUserInputProps> = ({ placeholder, label,maxLimit,friendOnly,filterSuggestionFn,hideUser,hideFriends, ...props  }) => {
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number>();
    const [users, setUsers] = useState<User[]>([]);

    const selUsers = props.value;
    const setSelUsers = (newUsers: User[]) => props.onChange(newUsers);
    
    
    const filterSuggestion = (usersArray: User[]) => {
        let array = usersArray;
        if (hideUser) {
            array = array.filter( u => u._id !== hideUser._id )
        }
        if (filterSuggestionFn) {
            return array.filter(filterSuggestionFn);
            
        }
        return array;
    }

    const handleUserSuggestionUpdate = (newSuggestions: User[]) => {
        setUsers(filterSuggestion(newSuggestions));
        setLoading(false);
    }

    useEffect( () => {
        setLoading(false);
    }, [props.value.length])

    useEffect(() => {
        
        if (userInput.length > 0) {
            setLoading(true)
            const sendRequestTimeouted = setTimeout(() => {
                const paramFriendOnly = friendOnly ?? false;  
                let url = `/users/search/byUsername?q=${userInput}&friendOnly=${paramFriendOnly}`;
                if (hideFriends) {
                    url = `/users/search/newfriends/byUsername?q=${userInput}`;
                }
                cAPIWrapper.get(url).then(
                  res => handleUserSuggestionUpdate(res.data)
                )
                // Send Axios request here
            }, 500)
              
          
            return () => {
                clearTimeout(sendRequestTimeouted);
            }
        }
        else {
            setLoading(false);
        }
        
      }, [userInput])
    
    const isMultiple  = maxLimit !== undefined && maxLimit > 1 
    const valueWrapper = () => {
        if (isMultiple) {
            return selUsers;
        }
        else {
            if (selUsers !== undefined && selUsers !== null) {
                if (selUsers.length > 0) {
                    return selUsers[0];
                }
            }
            return null;
        }
    }
    return (
        <>
            <Autocomplete
                fullWidth
                multiple={isMultiple}
                value={valueWrapper()}
                limitTags={2}
                options={users}
                loading={loading}
                getOptionLabel={(option) => option.username}
                renderTags={(value, getTagProps) => {
                    return value.map((option, index) => (
                        <Chip variant="outlined" label={option.username} {...getTagProps({ index })} avatar={
                            <Avatar><AvatarWrapper name={option.username} sx={{fontSize: "1.5em"}}/></Avatar>                                
                        }/>
                    ))
                }}
                onChange={(event, newValue) => {
                    if (Array.isArray(newValue)) {
                        if (newValue.length <= maxLimit) {
                            const _set = new Set<string>();
                            const finalArray:User[]= [];
                            newValue.forEach((u) => {
                                if (u._id !== undefined) {
                                    const n = _set.size;
                                    _set.add(u._id);
                                    if (n !== _set.size) {
                                        finalArray.push(u);
                                    }
                                }
                            })
                            setSelUsers(finalArray);
                        }
                    }
                    else {
                        setSelUsers(newValue ? [newValue]:[]);
                    }
                }}
                renderOption={(props, option) => 
                    <>
                        <ListItem {...props}>
                            <ListItemAvatar>
                                <AvatarWrapper name={option.username}></AvatarWrapper>
                            </ListItemAvatar>
                            <ListItemText>{option.username}</ListItemText>
                        </ListItem>
                    </>
                }
                renderInput={(params) => (
                    <TextField {...params} 
                        label={label} 
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading && <CircularProgress color="inherit" size={20} />}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )   
                        }}
                        placeholder={placeholder} />
                )}
                onInputChange={(e,newInputValue)=>setUserInput(newInputValue)}
                sx={{ width: '500px' }}
/>
        </>
    );
};

export default SearchUserInput;
