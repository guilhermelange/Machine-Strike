import { Button, Center, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useColorMode, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import Router from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdHelpOutline } from 'react-icons/md'
import Settings from '../machine_strike/global/Settings'
import IndexViewObserver from '../machine_strike/patterns/observer/IndexViewObserver'
import IndexViewUCImpl from '../machine_strike/patterns/observer/IndexViewUCImpl'

// Observer
class IndexManager implements IndexViewObserver  {
  play(): void {
    this.playCallback();
  }

  playCallback(): void {
    // Necessário para executar o método dentro da function Index
    // Sobrescrito
  };
}

const manager: IndexManager = new IndexManager();
const controller = new IndexViewUCImpl();
controller.addObserver(manager);
const settings = Settings.getInstance()

export default function Index() {
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    manager.playCallback = () => {
      Router.push('game')
    }
  }, [])

  const handleTryCatch = (data: any) => {
    try {
      controller.startGame(data)
    } catch (error) {
      let message = 'Erro interno'
      if (error instanceof Error)
        message = error.message

      toast({
        title: 'Falha ao iniciar',
        description: message,
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <Container h={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Flex direction={'column'} background={formBackground} p={6} rounded={6}>
          <Center mb={6}>
            <Heading>Machine Strike<Text display={'inline'} color={'teal.100'}>!</Text></Heading>
          </Center>
          <form style={{ width: '100%', 'display': 'flex', 'justifyContent': 'center' }} onSubmit={handleSubmit(data => handleTryCatch(data))}>
            <SimpleGrid columns={1} columnGap={3} rowGap={4} w={480}>
              <FormControl isInvalid={!!errors.machines}>
                <FormLabel htmlFor='machines'>Máquinas</FormLabel>
                <Input
                  type={'file'}
                  id='machines'
                  p={1}
                  placeholder='Selecione o arquivo de máquinas'
                  {...register('machines', {
                    required: 'Obrigatório informar um arquivo com máquinas',
                  })}
                />
                {settings?.machines_file && (
                  <Text pt={0.5} fontSize={'sm'} color={'whiteAlpha.500'}>Selecionado anteriormente: {settings?.machines_file}</Text>
                )}
                <FormErrorMessage>
                  {errors.machines && String(errors.machines.message)}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.board}>
                <FormLabel htmlFor='board'>Tabuleiro</FormLabel>
                <Input
                  type={'file'}
                  id='board'
                  p={1}
                  placeholder='Selecione o arquivo do Tabuleiro'
                  {...register('board', {
                    required: 'Obrigatório informar um arquivo de Tabuleiro',
                  })}
                />
                {settings?.board_file && (
                  <Text pt={0.5} fontSize={'sm'} color={'whiteAlpha.500'}>Selecionado anteriormente: {settings?.board_file}</Text>
                )}
                <FormErrorMessage>
                  {errors.board && String(errors.board.message)}
                </FormErrorMessage>
              </FormControl>
              <Button colorScheme={'teal'} isLoading={isSubmitting} type='submit'>
                Jogar
              </Button>
            </SimpleGrid>
          </form>
        </Flex>
        <Flex position={'absolute'} top={4} right={4} cursor={'pointer'} onClick={onOpen}>
          <MdHelpOutline size={24}></MdHelpOutline>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Como iniciar uma partida<Text display={'inline'} color={'teal.100'}>?</Text></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'} gap={4}>
              <Text>
                <Text display={'inline'} color={'teal.100'}>1. </Text>
                Deve ser selecionado um arquivo válido de máquinas disponíveis no Game.
              </Text>
              <Text>
                <Text display={'inline'} color={'teal.100'}>2. </Text>Deve ser selecionado um arquivo válido de tabuleiro do Game.
              </Text>
              <Text>
                <Text display={'inline'} color={'teal.100'}>3. </Text>Iniciar a partida com base nas configurações selecionada.
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}><Text display={'inline'} color={'teal.100'}>Vamos Jogar!</Text></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
