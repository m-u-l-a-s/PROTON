import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
    const [ordem, setOrdem] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setOrdem(event.target.value as string);
        console.log(ordem);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ordenação</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ordem}
                    label="Ordenação"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Nome</MenuItem>
                    <MenuItem value={20}>Completude</MenuItem>
                    <MenuItem value={30}>Data</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
