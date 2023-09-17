"use client";
import { Flex, Grid } from "@radix-ui/themes";
import React from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <>
      <Grid columns="1" gap="3">
        <Flex direction="column" gap="2">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                // 字体粗体
                fontWeight: "bold",
                fontSize: "5rem",
                marginTop: "30px",
                marginLeft: "30px",
                maxWidth: "400px",
              }}
            >
              <a
                href="/dashboard/main"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Hamster
              </a>
            </div>
            <div
              style={{
                // 字体粗体
                fontWeight: "bold",
                fontSize: "3rem",
                marginTop: "30px",
                marginRight: "30px",
                marginLeft: "30px",
              }}
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("无用幻想家")
                    .start()
                    .callFunction(() => {
                      typewriter.pause();
                    });
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginLeft: "30px",
              marginRight: "30px",
              marginTop: "10px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/index.jpg"
              alt="Landscapes"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "75vh",
                borderRadius: "30px", // 圆角
              }}
            />
          </div>
        </Flex>
      </Grid>
    </>
  );
}
