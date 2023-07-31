'use client';
import { Input, Link, Button, Textarea, Loading, Badge, Row, Spacer, Col, Container } from "@nextui-org/react";
import { useState, useRef } from 'react';

import { RxDownload } from "react-icons/rx";


import template from './utils/template';


export default function Form() {
  const [folderName, setFolderName] = useState<string[]>([]);
  const [bookmarkNames, setBookmarkNames] = useState<string[]>([]);

  const [links, setLinks] = useState("");
  const [templateHtml, setTemplateHtml] = useState(template)
  const downloadButtonRef = useRef<HTMLAnchorElement>(null);

  function onGenerateFolder() {
    const folderWithoutLinks = templateHtml.concat(`
        <DT><H3>${folderName}</H3>
        <DL><p>`
    )
    setTemplateHtml(folderWithoutLinks)

    for (let i = 0; i < links.length; i++) {

      // // Skip blank lines
      // if (links[i] == "") {
      //   continue;
      // }

      // // Default bookmark name to url string if name not specified
      // if (bookmarkNames[i] == "" || typeof bookmarkNames[i] == 'undefined') {
      //   bookmarkNames[i] = links[i];
      // }

      const bookmark = `<DT><A HREF="${links[i]}">${links[i]}</A>`

      setTemplateHtml(templateHtml.concat(bookmark))
    }
    console.log(templateHtml)
    console.log(links)

  }

  function onDownload() {
    const FILENAME = 'bookmarks.html'
    const blob = new Blob([templateHtml], { type: 'text/plain' });

    if (downloadButtonRef.current) {
      downloadButtonRef.current.href = URL.createObjectURL(blob);
      downloadButtonRef.current.download = FILENAME;
    }

  }

  return (
    <div>
      <Container>
        <div>
          <Input clearable label="Folder name (Optional)" placeholder="Enter your folder name" initialValue="" value={folderName} onChange={(event: any) => setFolderName(event.target.value)}
            css={{ width: "380px" }}
          />
        </div>
        <div>
          <Textarea
            label="Links"
            placeholder="Enter your links"
            onChange={(event: any) => {
              const text = event.target.value.split('\n');
              setLinks(text)
              onGenerateFolder()
            }}
            css={{ width: "380px" }}
          />
        </div>
        <Row alignItems="center" justify="center">
          <Button disabled bordered>
            CSV
            <Spacer />
            <Badge size="xs">COMING SOON</Badge>
          </Button>
          <Spacer y={1} />
          <Button iconRight={<RxDownload fill="currentColor" />} color="gradient" auto>
            <Link href="#" css={{ color: "#ffffff" }} id="download" download ref={downloadButtonRef} onClick={onDownload}>
              Download HTML
            </Link>
            {/* <Loading type="points" color="currentColor" size="sm" /> */}
          </Button>
        </Row>
      </Container>
    </div>
  );
}