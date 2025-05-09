import React from 'react';
import styles from '@/styles/Point_Usage.module.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import Image from 'next/image';
import Link from "next/link";


export default function Usage() {
    return (
        <div className={ styles.page }>
            <Typography
                  variant='h1'
                  fontSize="2.5rem"
                  fontWeight="bold"
                  textAlign="center"
                >
                    ポイント交換
            </Typography>
            <Box
              component="section"
              sx={{ mt: "40px" }}
              className={ styles.possession }
              >
                <Typography
                    variant='h2'
                    fontSize="1.5rem"
                    textAlign="center"
                    color="secondary"
                    fontWeight="bold"
                    sx={{ mt: "10px"}}
                    >
                        現在の所有ポイント：
                </Typography>
                <Typography
                    variant='h2'
                    fontSize="1.8rem"
                    textAlign="center"
                    color="secondary"
                    fontWeight="bold"
                    sx={{ mb: "10px"}}
                    >
                        〇ポイント
                </Typography>
            </Box>
            <Box
              component="section"
              sx={{ mt: "15px" }}
              className={ styles.precaution }
              >
                <Typography
                  variant='h3'
                  fontSize="1.2rem"
                  >
                    ※有効期限は引き換えてから
                </Typography>
                <Box
                component="section"
                className={ styles.subdivision }
                sx={{ display: "flex", alignItems: "flex-end" }}
                >
                    <Typography
                      variant='h3'
                      fontSize="1.8rem"
                      fontWeight="bold"
                      >
                        〇か月後
                    </Typography>
                    <Typography
                      variant='h3'
                      fontSize="1.2rem"
                      >
                        です。
                    </Typography>
                </ Box>
            </ Box>
            <Box      /* クーポン1行ずつ */
              sx={{ mt: "40px" }}
              maxWidth="400px"
              className={ styles.box }
              >
                <Box        /* クーポン詳細 */
                  className={ styles.framework }
                  >
                    <Box
                      component="section"
                      sx={{ mt: "20px", mb: "10px", ml: "10px" }}
                      className={ styles.row }
                      >
                        <Image src="/hachiko.png" alt="餃子6個" width="60" height="70"/>
                        <Box
                          sx={{ ml: "10px" }}
                          className={ styles.coupon }
                          >
                            <Typography 
                              textAlign="center"
                              variant='h4'
                              fontSize="1.3rem"
                              >
                                餃子6個
                            </Typography>
                            <Typography
                              textAlign="center"
                              variant='h4'
                              fontSize="1.4rem"
                              >
                                5%off
                            </Typography>
                        </Box>
                    </Box>
                    <Typography  /* box2つ追加してクーポンつくる */
                      textAlign="center"
                      fontSize="1.1rem"
                      >
                        〇ポイント使用
                    </Typography>
                    <Divider orientation="horizontal" sx={{ borderBottomWidth: '3px', borderColor: '#000000', mt: "5px", mb: "5px" }} />
                    <Link href="/" passHref>
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Button variant="contained" color="info" >詳細</Button>
                        </ Box>
                    </Link>
                </Box>
                <Box        /* クーポン詳細 */
                  className={ styles.framework }
                  >
                    <Box
                      component="section"
                      sx={{ mt: "20px", mb: "10px", ml: "10px" }}
                      className={ styles.row }
                      >
                        <Image src="/hachiko.png" alt="餃子6個" width="60" height="70"/>
                        <Box
                          sx={{ ml: "10px" }}
                          className={ styles.coupon }
                          >
                            <Typography 
                              textAlign="center"
                              variant='h4'
                              fontSize="1.3rem"
                              >
                                餃子12個
                            </Typography>
                            <Typography
                              textAlign="center"
                              variant='h4'
                              fontSize="1.4rem"
                              >
                                5%off
                            </Typography>
                        </Box>
                    </Box>
                    <Typography  /* box2つ追加してクーポンつくる */
                      textAlign="center"
                      fontSize="1.1rem"
                      >
                        〇ポイント使用
                    </Typography>
                    <Divider orientation="horizontal" sx={{ borderBottomWidth: '3px', borderColor: '#000000', mt: "5px", mb: "5px" }} />
                    <Link href="/" passHref>
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Button variant="contained" color="info" >詳細</Button>
                        </ Box>
                    </Link>
                </Box>
            </Box>
            <Box      /* クーポン全体 */
              sx={{ mt: "20px" }}
              maxWidth="400px"
              className={ styles.box }
            >
                <Box        /* クーポン詳細 */
                  className={ styles.framework }
                  >
                    <Box
                      component="section"
                      sx={{ mt: "20px", mb: "10px", ml: "10px" }}
                      className={ styles.row }
                      >
                        <Image src="/hachiko.png" alt="餃子6個" width="60" height="70"/>
                        <Box
                          sx={{ ml: "10px" }}
                          className={ styles.coupon }
                          >
                            <Typography 
                              textAlign="center"
                              variant='h4'
                              fontSize="1.3rem"
                              >
                                餃子6個
                            </Typography>
                            <Typography
                              textAlign="center"
                              variant='h4'
                              fontSize="1.4rem"
                              >
                                5%off
                            </Typography>
                        </Box>
                    </Box>
                    <Typography  /* box2つ追加してクーポンつくる */
                      textAlign="center"
                      fontSize="1.1rem"
                      >
                        〇ポイント使用
                    </Typography>
                    <Divider orientation="horizontal" sx={{ borderBottomWidth: '3px', borderColor: '#000000', mt: "5px", mb: "5px" }} />
                    <Link href="/" passHref>
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Button variant="contained" color="info" >詳細</Button>
                        </ Box>
                    </Link>
                </Box>
                <Box        /* クーポン詳細 */
                  className={ styles.framework }
                  >
                    <Box
                      component="section"
                      sx={{ mt: "20px", mb: "10px", ml: "10px" }}
                      className={ styles.row }
                      >
                        <Image src="/hachiko.png" alt="餃子12個" width="60" height="70"/>
                        <Box
                          sx={{ ml: "10px" }}
                          className={ styles.coupon }
                          >
                            <Typography 
                              textAlign="center"
                              variant='h4'
                              fontSize="1.3rem"
                              >
                                餃子12個
                            </Typography>
                            <Typography
                              textAlign="center"
                              variant='h4'
                              fontSize="1.4rem"
                              >
                                5%off
                            </Typography>
                        </Box>
                    </Box>
                    <Typography  /* box2つ追加してクーポンつくる */
                      textAlign="center"
                      fontSize="1.1rem"
                      >
                        〇ポイント使用
                    </Typography>
                    <Divider orientation="horizontal" sx={{ borderBottomWidth: '3px', borderColor: '#000000', mt: "5px", mb: "5px" }} />
                    <Link href="/" passHref>
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Button variant="contained" color="info" >詳細</Button>
                        </ Box>
                    </Link>
                </Box>
            </Box>
        </div>
    )
}