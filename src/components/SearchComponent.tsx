import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchComponent({ setInput }: { setInput: Function }) {
  return (
    <OutlinedInput
      required
      id="outlined-required"
      size="small"
      placeholder="Search here..."
      onChange={(e) => setInput(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default SearchComponent;
