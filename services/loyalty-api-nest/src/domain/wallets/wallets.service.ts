import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet, WalletStatus } from './entities/wallet.entity';
import { BalanceResponseDto } from './dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  /**
   * Create a new wallet for a member
   */
  async createWallet(memberId: string): Promise<Wallet> {
    const wallet = this.walletRepository.create({
      memberId,
      availableBalance: 0,
      pendingBalance: 0,
      expiredBalance: 0,
      status: WalletStatus.ACTIVE,
    });

    return this.walletRepository.save(wallet);
  }

  /**
   * Get wallet balance for a member
   * Only members can see their own balance
   */
  async getBalance(memberId: string): Promise<BalanceResponseDto> {
    const wallet = await this.walletRepository.findOne({
      where: { memberId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found for this member');
    }

    return {
      id: wallet.id,
      memberId: wallet.memberId,
      availableBalance: wallet.availableBalance,
    };
  }
}
