import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { SerialPort } from 'serialport';

@Injectable()
export class SerialPortService implements OnModuleInit, OnModuleDestroy {
  private port: SerialPort;
  private intervalId: NodeJS.Timeout;

  async onModuleInit() {
    await this.selectAndOpenPort();
    // this.startPortSwitching();
  }

  onModuleDestroy() {
    if (this.port) {
      this.port.close();
    }
    clearInterval(this.intervalId);
  }

  private async selectAndOpenPort() {
    const ports = await SerialPort.list();
    console.log(ports);

    if (ports.length === 0) {
      throw new Error('No serial ports found');
    }

    let selectedPort = ports[Math.floor(Math.random() * ports.length)];
    let count = 0;
    while (!selectedPort.serialNumber && count < 10) {
      selectedPort = ports[Math.floor(Math.random() * ports.length)];
      count++;
    }
    if (count == 10) console.log('There is not available ports');

    console.log(`Selected port: ${selectedPort.path}`);

    if (this.port) {
      this.port.close();
    }

    this.port = new SerialPort({
      path: '/dev/ttyUSB0',
      baudRate: 9600,
    });

    this.port.on('open', () => console.log(`Port ${selectedPort.path} opened`));
    this.port.on('error', (err) => console.error('Port error:', err));
  }

  private startPortSwitching() {
    this.intervalId = setInterval(
      async () => {
        console.log('Switching serial port...');
        await this.selectAndOpenPort();
      },
      5 * 60 * 1000,
    );
  }

  getPort(): SerialPort {
    return this.port;
  }
}
