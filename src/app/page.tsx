'use client';

import styles from './page.module.css'
import Form from './components/Form'
import { Text } from "@nextui-org/react";


export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <Text h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold">
          Bookmarks Generator
        </Text>
        <Text>
          Colocar uma descrição aqui
        </Text>
      </header>
      <Form />

    </main>
  )
}
