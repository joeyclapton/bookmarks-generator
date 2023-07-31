'use client';
import { Input, Spacer, Button, Textarea } from "@nextui-org/react";
import { useState } from 'react';
import { CameraIcon } from './CameraIcon';

import template from './utils/template';


export default function Form() {
  const [folderName, setFolderName] = useState<string[]>([]);
  const [bookmarkNames, setBookmarkNames] = useState<string[]>([]);

  const [links, setLinks] = useState("");
  const [templateHtml, setTemplateHtml] = useState(template)

  function onGenerateFolder() {
    const folderWithoutLinks = templateHtml.concat(`
        <DT><H3>${folderName}</H3>
        <DL><p>`
    )
    setTemplateHtml(folderWithoutLinks)

    for (var i = 0; i < links.length; i++) {

      // // Skip blank lines
      // if (links[i] == "") {
      //   continue;
      // }

      // // Default bookmark name to url string if name not specified
      // if (bookmarkNames[i] == "" || typeof bookmarkNames[i] == 'undefined') {
      //   bookmarkNames[i] = links[i];
      // }

      var bookmark = `<DT><A HREF="${links[i]}">${links[i]}</A>`
      setTemplateHtml(templateHtml.concat(bookmark))
    }
    console.log(templateHtml)
    console.log(links)

  }

  return (
    <div>
      <Input clearable label="Name" placeholder="Enter your folder name" initialValue="" value={folderName} onChange={(event: any) => setFolderName(event.target.value)}
      />
      <section>
        <Textarea
          label="Write your links"
          placeholder="Enter your links."
          onChange={(event: any) => {
            const text = event.target.value.split('\n');
            setLinks(text)
            onGenerateFolder()
          }}
        />
        <Button iconRight={<CameraIcon fill="currentColor" />}>
          Take a photo
        </Button>
      </section>
    </div>
  );
}