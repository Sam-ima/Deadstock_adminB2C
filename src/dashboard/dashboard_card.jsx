import React from "react";
import { motion } from "framer-motion";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
} from "@mui/material";

import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

const DashboardCards = ({
  cardData,
  theme,
  itemVariants,
  totalSalesAmount,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
    >
      <Grid
        container
          justifyContent="center"
          alignItems="stretch"
          spacing={{ xs: 2, sm: 3, md: 3 }}   // ✅ Responsive spacing
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }} // ✅ Responsive margin
      >

        {cardData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
            justifyContent="center"              // ✅ Better layout on large screens
            key={index}
          >

            <motion.div variants={itemVariants}>

              <Card
                elevation={0}
                onClick={card.onClick}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,

                  minHeight: { xs: 180, sm: 200, md: 220 }, // ✅ Equal card height

                  background: `linear-gradient(135deg,
                    ${theme.palette.background.paper} 0%,
                    ${theme.palette.background.default} 100%)`,

                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[10],
                    borderColor: card.color,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 3 }, // ✅ Responsive padding
                  }}
                >

                  {/* Top Row */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: { xs: 1.5, sm: 2 },
                      flexWrap: "wrap", // ✅ Prevent overflow
                      gap: 1,
                    }}
                  >

                    {/* Icon */}
                    <Avatar
                      sx={{
                        bgcolor: card.color,

                        width: { xs: 42, sm: 48, md: 56 }, // ✅ Responsive icon
                        height: { xs: 42, sm: 48, md: 56 },

                        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },

                        boxShadow: `0 8px 16px -4px ${card.color}40`,
                      }}
                    >
                      {card.icon}
                    </Avatar>

                    {/* Trend Chip */}
                    {card.trend && (
                      <Chip
                        icon={
                          card.trendUp
                            ? <TrendingUpIcon fontSize="small" />
                            : <TrendingDownIcon fontSize="small" />
                        }
                        label={card.trend}
                        size="small"
                        sx={{
                          bgcolor: card.trendUp
                            ? `${theme.palette.success.main}20`
                            : `${theme.palette.error.main}20`,

                          color: card.trendUp
                            ? theme.palette.success.main
                            : theme.palette.error.main,

                          fontWeight: 600,

                          fontSize: {
                            xs: "0.65rem",
                            sm: "0.75rem",
                            md: "0.8rem",
                          }, // ✅ Responsive chip text
                        }}
                      />
                    )}

                  </Box>

                  {/* Value */}
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: "1.4rem",
                        sm: "1.7rem",
                        md: "2rem",
                      }, // ✅ Responsive value
                    }}
                  >
                    {card.value}
                  </Typography>

                  {/* Title */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.9rem",
                      }, // ✅ Responsive title
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Progress Bar */}
                  <Box
                    sx={{
                      mt: { xs: 1.5, sm: 2 },

                      height: { xs: 3, sm: 4 }, // ✅ Responsive bar height

                      borderRadius: 2,
                      bgcolor: `${card.color}20`,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            25,
                            Math.round(
                              typeof card.value === "number"
                                ? card.value
                                : totalSalesAmount > 0
                                ? totalSalesAmount / 100000
                                : 50
                            )
                          )
                        )}%`,

                        height: "100%",
                        bgcolor: card.color,
                        borderRadius: 2,

                        transition: "width 0.8s ease-in-out",
                      }}
                    />
                  </Box>

                </CardContent>
              </Card>

            </motion.div>

          </Grid>
        ))}

      </Grid>
    </motion.div>
  );
};

export default DashboardCards;