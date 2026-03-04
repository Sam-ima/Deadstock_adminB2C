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
      <Grid container spacing={3} sx={{ mb: 4 }}>

        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>

            <motion.div variants={itemVariants}>

              <Card
                elevation={0}
                onClick={card.onClick}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
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
                <CardContent>

                  {/* Top Row */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >

                    {/* Icon */}
                    <Avatar
                      sx={{
                        bgcolor: card.color,
                        width: 56,
                        height: 56,
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
                            ? <TrendingUpIcon />
                            : <TrendingDownIcon />
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
                        }}
                      />
                    )}

                  </Box>

                  {/* Value */}
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {card.value}
                  </Typography>

                  {/* Title */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {card.title}
                  </Typography>

                  {/* Progress Bar */}
                  <Box
                    sx={{
                      mt: 2,
                      height: 4,
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