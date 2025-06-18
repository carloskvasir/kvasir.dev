import { MDXComponents } from 'mdx/types';

// Componente customizado para imagens
const CustomImage = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // Se a imagem não existe (placeholder), mostrar um placeholder visual
  if (typeof src === 'string' && src.includes('.placeholder')) {
    return (
      <div className="my-6 p-8 bg-muted border-2 border-dashed border-border rounded-lg text-center">
        <div className="text-muted-foreground">
          <div className="text-sm font-medium mb-2">📷 Imagem: {alt}</div>
          <div className="text-xs">Placeholder - imagem seria exibida aqui</div>
          <div className="text-xs mt-1 opacity-60">Arquivo: {src?.split('/').pop()}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="relative overflow-hidden rounded-lg border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={typeof src === 'string' ? src : ''}
          alt={alt || ''}
          className="w-full h-auto"
          loading="lazy"
          {...props}
        />
      </div>
      {alt && (
        <div className="text-center mt-2 text-sm text-muted-foreground italic">
          {alt}
        </div>
      )}
    </div>
  );
};

// Componentes customizados para tabelas MDX
const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full border-collapse border border-border rounded-lg overflow-hidden" {...props}>
      {children}
    </table>
  </div>
);

const TableHead = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-muted" {...props}>
    {children}
  </thead>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-b border-border hover:bg-muted transition-colors" {...props}>
    {children}
  </tr>
);

const TableHeader = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wide text-foreground" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-4 py-3 text-sm border-b border-border last:border-b-0" {...props}>
    {children}
  </td>
);

export const mdxComponents: MDXComponents = {
  img: CustomImage,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};
