import { Grid, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";

export default function ComboPrioridade({ value, onChange }: any) {
    const handleOrderChange = (event: any) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <InputLabel
                    id="ordem-label"
                    style={{
                        color: "#B6F3F8",
                        fontFamily: "Poppins",
                        fontSize: "1.2rem",
                    }}
                >
                    Nível de prioridade:
                </InputLabel>
            </Grid>
            <Grid item>
                <Select
                    labelId="ordem-label"
                    id="ordem"
                    value={value}
                    name="etapa_status"
                    onChange={handleOrderChange}
                    style={{
                        color: "white",
                        fontFamily: "Poppins",
                        fontSize: "1.2rem",
                    }}
                >
                    <MenuItem
                        style={{
                            color: "white",
                            fontFamily: "Poppins",
                            fontSize: "1.2rem",
                        }}
                        value={1}
                    >
                        Alta
                    </MenuItem>
                    <MenuItem
                        style={{
                            color: "white",
                            fontFamily: "Poppins",
                            fontSize: "1.2rem",
                        }}
                        value={2}
                    >
                        Média
                    </MenuItem>
                    <MenuItem
                        style={{
                            color: "white",
                            fontFamily: "Poppins",
                            fontSize: "1.2rem",
                        }}
                        value={3}
                    >
                        Baixa
                    </MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
}
