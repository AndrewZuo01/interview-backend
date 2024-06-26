import Page from 'pages/Page';

import { useParams } from 'react-router-dom';
import Chat from 'components/organisms/chat/index';
import { useChatInteract, IStep } from '@chainlit/react-client';
import { IAttachment } from 'state/chat';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

export default function Home() {
  const { scene, level, positionName } = useParams<{ scene: string; level: string, positionName: string; }>();
  const { sendMessage } = useChatInteract();
  useEffect(() => {
    if (scene !== undefined && level !== undefined) {
      const placeholder: IAttachment[] = [];
      const initMessage: IStep = {
        id: uuidv4(),
        name: '系统',
        type: 'init_message',
        scene: scene,
        level: level,
        output: '',
        createdAt: new Date().toISOString(),
      };
      sendMessage(initMessage, placeholder);
    }
  }, [scene, level]);

  return (
    <Page>
      <Chat name={positionName!}/>
    </Page>
  );
}
