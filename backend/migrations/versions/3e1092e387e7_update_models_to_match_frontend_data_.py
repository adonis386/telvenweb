"""Update models to match frontend data structure

Revision ID: 3e1092e387e7
Revises: db89234394f7
Create Date: 2025-03-18 17:04:01.963328

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e1092e387e7'
down_revision = 'db89234394f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('internet_device', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('internet_device', schema=None) as batch_op:
        batch_op.drop_column('category')

    # ### end Alembic commands ###
