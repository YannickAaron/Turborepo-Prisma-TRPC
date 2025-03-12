"use client";

import React, { ChangeEvent } from "react";
import { Box, Chip, TextField, Typography } from "@mui/material";

interface ChipInputProps {
  label: string;
  onChange: (tags: string[]) => void;
  prevData?: string[];
}

export const ChipInput = ({ label, onChange, prevData }: ChipInputProps) => {
  const [inputValue, setInputValue] = React.useState("");
  const [tags, setTags] = React.useState<string[]>(prevData ?? []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      const newTags = [...tags, trimmedInput];
      setTags(newTags);
      setInputValue("");
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags);
  };

  const handleInputBlur = () => {
    addTag();
  };

  return (
    <Box>
      <TextField
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          mt: tags.length > 0 ? 1 : 0,
        }}
      >
        {tags && tags.length > 0 ? (
          tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => removeTag(tag)}
              color="primary"
              variant="outlined"
            />
          ))
        ) : (
          <Typography variant="caption" color="lightgrey">
            Press enter or comma to add tags.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
