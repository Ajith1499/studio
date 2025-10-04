import { getWalletBalance, getWalletTransactions } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function WalletPage() {
  const balance = getWalletBalance();
  const transactions = getWalletTransactions();

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold">My Wallet</h1>

      <Card>
        <CardHeader>
          <CardDescription>Current Balance</CardDescription>
          <CardTitle className="font-headline text-5xl">
            ${balance.toFixed(2)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            This balance can be used for purchases on NearThreads but cannot be
            withdrawn to a bank account.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">
                    {format(new Date(t.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-semibold',
                      t.type === 'credit'
                        ? 'text-green-600'
                        : 'text-destructive'
                    )}
                  >
                    {t.type === 'credit' ? '+' : '-'}${t.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
